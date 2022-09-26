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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        if (!token)
            return next();
        const decoded = (jsonwebtoken_1.default.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`));
        const user = yield userModel_1.User.findOne({ _id: decoded.id });
        if (!user)
            return next();
        req.user = user;
    }
    catch (error) { }
    next();
});
exports.default = currentUser;
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// interface UserPayload {
//   id: string;
//   email: string;
// }
// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: UserPayload;
//     }
//   }
// }
// export const currentUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session?.jwt) {
//     return next();
//   }
//   try {
//     const payload = jwt.verify(
//       req.session.jwt,
//       process.env.JWT_KEY!
//     ) as UserPayload;
//     req.currentUser = payload;
//   } catch (err) {}
//   next();
// };
