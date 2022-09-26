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
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsVerify = exports.smsOTP = exports.sendSms = void 0;
const sendSms = (to, body, txt) => {
    return { msg: "Helloo" };
};
exports.sendSms = sendSms;
const smsOTP = (to, channel) => __awaiter(void 0, void 0, void 0, function* () {
    return { msg: "Helloo" };
});
exports.smsOTP = smsOTP;
const smsVerify = (to, code) => __awaiter(void 0, void 0, void 0, function* () {
    return { msg: "Helloo" };
});
exports.smsVerify = smsVerify;
