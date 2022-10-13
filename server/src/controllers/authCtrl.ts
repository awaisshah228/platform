import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Nonce } from "../models/nonceModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateNonce, isValidMessageHash } from "../utils/ethHelper";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import sendMail from "../utils/sendMail";
import { BadRequestError } from "../errors";
import { validateEmail, validPhone } from "../utils/valid";
import { sendSms, smsOTP, smsVerify } from "../utils/sendSMS";
import {
  IDecodedToken,
  IUser,
  IGgPayload,
  IUserParams,
  IReqAuth,
} from "../utils/interface";
// import { verifyMessage } from 'ethers/lib/utils'


import { OAuth2Client } from "google-auth-library";
// import fetch from "node-fetch";
import axios from "axios";
import { CustomError } from "../errors/custom-errors";
import { getArbitraryCode } from "../utils/ethHelper";

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  register: async (req: Request, res: Response) => {
    const { name, account, password } = req.body;
    let user: any;

    const existingUser = await User.findOne({ account });

    if (!existingUser) {
      user = User.build({ name, account, password });
      await user.save();
    }

    if (existingUser?.activated == true) {
      throw new BadRequestError("Already Activated");
    }

    user = existingUser;
    user.password = password;
    await user.save();

    const newUser = { name, account, password: user.password };

    const active_token = generateActiveToken({ newUser });

    const url = `${CLIENT_URL}/active/${active_token}`;

    if (validateEmail(account)) {
      sendMail(account, url, "Verify your email address");
      return res.status(201).json({ msg: "Success! Please check your email." });
    } else if (validPhone(account)) {
      sendSms(account, url, "Verify your phone number");
      return res.status(201).json({ msg: "Success! Please check your email." });
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    const { active_token } = req.body;
    // console.log(active_token);

    const decoded = <IDecodedToken>(
      jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
    );

    const { newUser } = decoded;

    const user = await User.findOne({ account: newUser!.account });
    if (user!.activated == true) {
      throw new BadRequestError("Account is already activated");
    }

    user!.activated = true;
    await user?.save();
    res.status(200).json({ msg: "Your account has been activated" });
  },
  login: async (req: Request, res: Response) => {
    const { account, password } = req.body;

    const user = await User.findOne({ account });
    if (!user) {
      throw new BadRequestError("Invalid Account");
    }
    if (user.activated == false) {
      throw new BadRequestError("Account not activated");
    }

    // if user exists
    loginUser(user, password, res, "");
  },
  logout: async (req: IReqAuth, res: Response) => {
    res.clearCookie("refreshtoken", { path: `/v1/auth/refresh_token` });

    await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        rf_token: "",
      }
    );

    return res.json({ msg: "Logged out!" });
  },
  refreshToken: async (req: Request, res: Response) => {
    
    try {
      const rf_token = req.cookies.refreshtoken;
      // console.log(rf_token);
      if (!rf_token) throw new BadRequestError("Please Login before");

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );

      const user = await User.findById(decoded.id).select("+rf_token");
      // const user = await Users.findById(decoded.id).select("-password +rf_token")

      if (!user) throw new BadRequestError("Account not exists");

      if (rf_token !== user.rf_token)
        throw new BadRequestError("Please Login before");

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await User.findOneAndUpdate(
        { _id: user._id },
        {
          rf_token: refresh_token,
        }
      );

      res.json({ access_token, user });
      
    } catch (err:any) {

      if (err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()});
      }
      // const tokenExpire: any=JSON.stringify(err)
      // console.log(tokenExpire.name)
      if(err.name=='TokenExpiredError'){
        return res.status(400).send({errors:[{ message:"please Login before"}]});
    
      }

      
     
      
      if(err){
        return  res.status(400).send({
          errors: [err],
        });
      }
      res.status(400).send({
        errors: ["something went wrong "],
      });
      
    }
    
    
      
    
  },
  googleLogin: async (req: Request, res: Response) => {
    const { id_token } = req.body;
    const verify = await client.verifyIdToken({
      idToken: id_token,
      audience: `${process.env.MAIL_CLIENT_ID}`,
    });

    const { email, email_verified, name, picture } = <IGgPayload>(
      verify.getPayload()
    );

    if (!email_verified)
      throw new BadRequestError("Email verification failed.");

    const password = email + "your google secrect password";
    // const passwordHash = await bcrypt.hash(password, 12)

    const user = await User.findOne({ account: email });

    if (user) {
      loginUser(user, password, res, "other");
    } else {
      const user = {
        name,
        account: email,
        password: password,
        avatar: picture,
        type: "google",
      };
      registerUser(user, res);
    }
  },
  facebookLogin: async (req: Request, res: Response) => {
    const { accessToken, userID } = req.body;
    console.log(accessToken);

    const URL = `
          https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}
        `;

    const resp: any = await axios(URL);
    // .then(res => res.json())
    // .then(res => { return res })
    // console.log(resp.data)

    const { email, name, picture } = resp.data;

    const password = email + "your facebook secrect password";
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.findOne({ account: email });

    if (user) {
      loginUser(user, password, res, "facebook");
    } else {
      const user = {
        name,
        account: email,
        password: password,
        avatar: picture.data.url,
        type: "facebook",
      };
      registerUser(user, res);
    }
  },
  loginSMS: async (req: Request, res: Response) => {
    const { phone } = req.body;
    console.log(phone);
    // res.json({phone})

    const data = await smsOTP(phone, "sms");
    res.json(data);
  },
  smsVerify: async (req: Request, res: Response) => {
    const { phone, code } = req.body;

    const data = await smsVerify(phone, code);
    if (!data?.valid) throw new BadRequestError("Invalid authentication");

    const password = phone + "your phone secrect password";
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.findOne({ account: phone });

    if (user) {
      loginUser(user, password, res, "mobile");
    } else {
      const user = {
        name: phone,
        account: phone,
        password: password,
        type: "sms",
      };
      registerUser(user, res);
    }
  },
  createNonce:async (req:Request,res:Response)=>{

    const nonce = generateNonce();
    const {address}=req.body 


    const reqSign:any = Nonce.build({nonce,address});
    await reqSign.save()

    const msg= getArbitraryCode(address,nonce)



    return res.json({...reqSign._doc,msg})

  },
  metamaskLogin:async (req:Request,res:Response)=>{

       const {nonce, signature}=req.body
    const signingRequst = await Nonce.findOne({      nonce
    }
    );


    if (!signingRequst) {
      throw new BadRequestError('invalid signing request');
    }

    const address = signingRequst.address;
      const validSignature = isValidMessageHash(
        signature,
        address,
        nonce
      );


      if (!validSignature) {
        throw new BadRequestError('invalid signing request');
      }

      const  user = await User.findOne({address});

      const password = address + "your facebook secrect password";
      if (user) {
        loginUser(user, password, res, "metamask");
      } else {
        const user = {
          name: address.substring(0,5),
          address: address,
          password: password,
          type: "metamask",
          account:`${address}@gmail.com`
        };
        registerUser(user, res);
      }

   



    // return res.json({msg: "done"})

  },
  
  forgotPassword: async (req: Request, res: Response) => {
    const { account } = req.body;

    const user = await User.findOne({ account });
    if (!user)
           throw new BadRequestError('User not exists')
    if (user.type !== "register")
      throw new BadRequestError(
        "Quick login account with ${user.type} can't use this function"
      );

    const access_token = generateAccessToken({ id: user._id });

    const url = `${CLIENT_URL}/reset_password/${access_token}`;

    if (validPhone(account)) {
      sendSms(account, url, "Forgot password?");
      return res.json({ msg: "Success! Please check your phone." });
    } else if (validateEmail(account)) {
      sendMail(account, url, "Forgot password?");
      return res.json({ msg: "Success! Please check your email." });
    }
  },
};

const loginUser = async (
  user: IUser,
  password: string,
  res: Response,
  type: string
) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!type && !isMatch) {
    let msgError =
      user.type === "register"
        ? "Password is incorrect."
        : `Password is incorrect. This account login with ${user.type}`;

    return res.status(400).json({ errors: [{ message: msgError }] });
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      rf_token: refresh_token,
    }
  );

  res.json({
    msg: "Login Success!",
    access_token,
    user,
  });
};

const registerUser = async (user: IUserParams, res: Response) => {
  const newUser = User.build(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id }, res);

  newUser.rf_token = refresh_token;
  await newUser.save();

  res.json({
    msg: "Login Success!",
    access_token,
    user: { ...newUser },
  });
};

export default authCtrl;
