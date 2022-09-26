"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../utils/generateToken");
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const errors_1 = require("../errors");
const valid_1 = require("../utils/valid");
const sendSMS_1 = require("../utils/sendSMS");
const google_auth_library_1 = require("google-auth-library");
// import fetch from "node-fetch";
const axios_1 = __importDefault(require("axios"));
const custom_errors_1 = require("../errors/custom-errors");
const client = new google_auth_library_1.OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const CLIENT_URL = `${process.env.BASE_URL}`;
const authCtrl = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, account, password } = req.body;
        let user;
        const existingUser = yield userModel_1.User.findOne({ account });
        if (!existingUser) {
            user = userModel_1.User.build({ name, account, password });
            yield user.save();
        }
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.activated) == true) {
            throw new errors_1.BadRequestError("Already Activated");
        }
        user = existingUser;
        user.password = password;
        yield user.save();
        const newUser = { name, account, password: user.password };
        const active_token = (0, generateToken_1.generateActiveToken)({ newUser });
        const url = `${CLIENT_URL}/active/${active_token}`;
        if ((0, valid_1.validateEmail)(account)) {
            (0, sendMail_1.default)(account, url, "Verify your email address");
            return res.status(201).json({ msg: "Success! Please check your email." });
        }
        else if ((0, valid_1.validPhone)(account)) {
            (0, sendSMS_1.sendSms)(account, url, "Verify your phone number");
            return res.status(201).json({ msg: "Success! Please check your email." });
        }
    }),
    activeAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { active_token } = req.body;
        // console.log(active_token);
        const decoded = (jsonwebtoken_1.default.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`));
        const { newUser } = decoded;
        const user = yield userModel_1.User.findOne({ account: newUser.account });
        if (user.activated == true) {
            throw new errors_1.BadRequestError("Account is already activated");
        }
        user.activated = true;
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json({ msg: "Your account has been activated" });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { account, password } = req.body;
        const user = yield userModel_1.User.findOne({ account });
        if (!user) {
            throw new errors_1.BadRequestError("Invalid Account");
        }
        if (user.activated == false) {
            throw new errors_1.BadRequestError("Account not activated");
        }
        // if user exists
        loginUser(user, password, res, "");
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        res.clearCookie("refreshtoken", { path: `/v1/auth/refresh_token` });
        yield userModel_1.User.findOneAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, {
            rf_token: "",
        });
        return res.json({ msg: "Logged out!" });
    }),
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rf_token = req.cookies.refreshtoken;
            // console.log(rf_token);
            if (!rf_token)
                throw new errors_1.BadRequestError("Please Login before");
            const decoded = (jsonwebtoken_1.default.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`));
            const user = yield userModel_1.User.findById(decoded.id).select("+rf_token");
            // const user = await Users.findById(decoded.id).select("-password +rf_token")
            if (!user)
                throw new errors_1.BadRequestError("Account not exists");
            if (rf_token !== user.rf_token)
                throw new errors_1.BadRequestError("Please Login before");
            const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
            const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id }, res);
            yield userModel_1.User.findOneAndUpdate({ _id: user._id }, {
                rf_token: refresh_token,
            });
            res.json({ access_token, user });
        }
        catch (err) {
            if (err instanceof custom_errors_1.CustomError) {
                return res.status(err.statusCode).send({ errors: err.serializeErrors() });
            }
            // const tokenExpire: any=JSON.stringify(err)
            // console.log(tokenExpire.name)
            if (err.name == 'TokenExpiredError') {
                return res.status(400).send({ errors: [{ message: "please Login before" }] });
            }
            if (err) {
                return res.status(400).send({
                    errors: [err],
                });
            }
            res.status(400).send({
                errors: ["something went wrong "],
            });
        }
    }),
    googleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id_token } = req.body;
        const verify = yield client.verifyIdToken({
            idToken: id_token,
            audience: `${process.env.MAIL_CLIENT_ID}`,
        });
        const { email, email_verified, name, picture } = (verify.getPayload());
        if (!email_verified)
            throw new errors_1.BadRequestError("Email verification failed.");
        const password = email + "your google secrect password";
        // const passwordHash = await bcrypt.hash(password, 12)
        const user = yield userModel_1.User.findOne({ account: email });
        if (user) {
            loginUser(user, password, res, "other");
        }
        else {
            const user = {
                name,
                account: email,
                password: password,
                avatar: picture,
                type: "google",
            };
            registerUser(user, res);
        }
    }),
    facebookLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { accessToken, userID } = req.body;
        console.log(accessToken);
        const URL = `
          https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}
        `;
        const resp = yield (0, axios_1.default)(URL);
        // .then(res => res.json())
        // .then(res => { return res })
        // console.log(resp.data)
        const { email, name, picture } = resp.data;
        const password = email + "your facebook secrect password";
        const passwordHash = yield bcrypt_1.default.hash(password, 12);
        const user = yield userModel_1.User.findOne({ account: email });
        if (user) {
            loginUser(user, password, res, "facebook");
        }
        else {
            const user = {
                name,
                account: email,
                password: password,
                avatar: picture.data.url,
                type: "facebook",
            };
            registerUser(user, res);
        }
    }),
    loginSMS: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { phone } = req.body;
        console.log(phone);
        // res.json({phone})
        const data = yield (0, sendSMS_1.smsOTP)(phone, "sms");
        res.json(data);
    }),
    smsVerify: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { phone, code } = req.body;
        const data = yield (0, sendSMS_1.smsVerify)(phone, code);
        if (!(data === null || data === void 0 ? void 0 : data.valid))
            throw new errors_1.BadRequestError("Invalid authentication");
        const password = phone + "your phone secrect password";
        const passwordHash = yield bcrypt_1.default.hash(password, 12);
        const user = yield userModel_1.User.findOne({ account: phone });
        if (user) {
            loginUser(user, password, res, "mobile");
        }
        else {
            const user = {
                name: phone,
                account: phone,
                password: password,
                type: "sms",
            };
            registerUser(user, res);
        }
    }),
    forgotPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { account } = req.body;
        const user = yield userModel_1.User.findOne({ account });
        if (!user)
            throw new errors_1.BadRequestError('User not exists');
        if (user.type !== "register")
            throw new errors_1.BadRequestError("Quick login account with ${user.type} can't use this function");
        const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
        const url = `${CLIENT_URL}/reset_password/${access_token}`;
        if ((0, valid_1.validPhone)(account)) {
            (0, sendSMS_1.sendSms)(account, url, "Forgot password?");
            return res.json({ msg: "Success! Please check your phone." });
        }
        else if ((0, valid_1.validateEmail)(account)) {
            (0, sendMail_1.default)(account, url, "Forgot password?");
            return res.json({ msg: "Success! Please check your email." });
        }
    }),
};
const loginUser = (user, password, res, type) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!type && !isMatch) {
        let msgError = user.type === "register"
            ? "Password is incorrect."
            : `Password is incorrect. This account login with ${user.type}`;
        return res.status(400).json({ errors: [{ message: msgError }] });
    }
    const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id }, res);
    yield userModel_1.User.findOneAndUpdate({ _id: user._id }, {
        rf_token: refresh_token,
    });
    res.json({
        msg: "Login Success!",
        access_token,
        user,
    });
});
const registerUser = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = userModel_1.User.build(user);
    const access_token = (0, generateToken_1.generateAccessToken)({ id: newUser._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: newUser._id }, res);
    newUser.rf_token = refresh_token;
    yield newUser.save();
    res.json({
        msg: "Login Success!",
        access_token,
        user: Object.assign({}, newUser),
    });
});
exports.default = authCtrl;
