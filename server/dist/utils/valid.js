"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validPhone = void 0;
function validPhone(phone) {
    const re = /^[+]/g;
    return re.test(phone);
}
exports.validPhone = validPhone;
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
exports.validateEmail = validateEmail;
