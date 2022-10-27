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
const errors_1 = require("../errors");
const bad_request_error_1 = require("./../errors/bad-request-error");
const valid_1 = require("../utils/valid");
const valid_2 = require("./../utils/valid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userCtrl = {
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const { name, account, address } = req.body;
        if (!req.body.name) {
            throw new bad_request_error_1.BadRequestError("Name is not suppliend");
        }
        if (!req.body.account) {
            throw new bad_request_error_1.BadRequestError("Email or Phone is not suppliend");
        }
        if (!req.body.address) {
            throw new bad_request_error_1.BadRequestError("Email or Phone is not suppliend");
        }
        if (!(0, valid_1.validateEmail)(account) && !(0, valid_2.validPhone)(account)) {
            throw new bad_request_error_1.BadRequestError("account not valid");
        }
        const user = yield userModel_1.User.findOne({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        const accountCheck = yield userModel_1.User.findOne({ account });
        // const accountCheck:any = await User.findOne({address})
        // console.log(user._id)
        // console.log(accountCheck)
        if (accountCheck && JSON.stringify(user._id) != JSON.stringify(accountCheck._id)) {
            throw new bad_request_error_1.BadRequestError("this is already is in use by some one else");
        }
        console.log(req.file);
        const updateUser = yield userModel_1.User.findOneAndUpdate({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }, {
            avatar: req.file ? (_c = req.file) === null || _c === void 0 ? void 0 : _c.location : user === null || user === void 0 ? void 0 : user.avatar,
            name,
            account,
            address
        }, {
            new: true
        });
        res.json({ msg: "success", updateUser });
        // res.json({ msg: "Update Success!" })
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const { password } = req.body;
        const passwordHash = yield bcrypt_1.default.hash(password, 12);
        yield userModel_1.User.findOneAndUpdate({ _id: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id }, {
            password: passwordHash,
        });
        res.json({ msg: "Reset Password Success!" });
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.User.findById(req.params.id);
        if (!user) {
            throw new errors_1.NotFoundError();
        }
        res.json(user);
    }),
};
exports.default = userCtrl;
