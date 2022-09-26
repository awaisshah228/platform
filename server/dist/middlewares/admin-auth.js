"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const adminAuth = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    next();
};
exports.adminAuth = adminAuth;
