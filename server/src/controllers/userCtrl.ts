import { Request, Response } from "express";
import { IReqAuth } from "../utils/interface";
import { User } from "../models/userModel";
import { NotFoundError } from "../errors";
import { IUser } from './../utils/interface';
import { BadRequestError } from './../errors/bad-request-error';
import { validateEmail } from "../utils/valid";
import { validPhone } from './../utils/valid';
import bcrypt from "bcrypt";




const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    const { name,account } = req.body;
    
    if(!req.body.name){
      throw new BadRequestError("Name is not suppliend")
    }
    if(!req.body.account){
      throw new BadRequestError("Email or Phone is not suppliend")
    }
    if(!validateEmail(account) && !validPhone(account)){
         throw new BadRequestError("account not valid");
    }
    const user:any=await User.findOne({_id:req.user?._id })

    const accountCheck:any = await User.findOne({account})
    // console.log(user._id)
    // console.log(accountCheck)
    if(accountCheck && JSON.stringify(user._id)!=JSON.stringify(accountCheck._id)){
          throw new BadRequestError("this is already is in use by some one else")
    }
    console.log(req.file)

    const updateUser= await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        avatar: req.file ? req.file?.location : user?.avatar,
        name,
        account
        
      },{
        new: true
      }
    );
    res.json({ msg: "success",updateUser})
     // res.json({ msg: "Update Success!" })
  },
  resetPassword: async (req: IReqAuth, res: Response) => {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12)


    await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        password: passwordHash,
      }
    );

    res.json({ msg: "Reset Password Success!" });
  },
  getUser: async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError();
    }
    res.json(user);
  },
};

export default userCtrl;
