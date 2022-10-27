"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authCtrl_1 = __importDefault(require("../controllers/authCtrl"));
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middlewares/validate-request");
const require_auth_1 = require("../middlewares/require-auth");
const ethereumjs_util_1 = require("ethereumjs-util");
const router = express_1.default.Router();
router.post("/register", [
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.body)("account").isEmail().withMessage("Email must be valid"),
        (0, express_validator_1.body)("account")
            .custom((value) => {
            const re = /^[+]/g;
            return re.test(value);
        })
            .withMessage("Must provide number"),
    ]),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("You must supply a name"),
], validate_request_1.validateRequest, authCtrl_1.default.register);
router.post("/active", authCtrl_1.default.activeAccount);
router.post("/login", authCtrl_1.default.login);
router.get("/logout", require_auth_1.requireAuth, authCtrl_1.default.logout);
router.get("/refresh_token", authCtrl_1.default.refreshToken);
router.post("/google_login", authCtrl_1.default.googleLogin);
router.post("/facebook_login", authCtrl_1.default.facebookLogin);
router.post("/login_sms", authCtrl_1.default.loginSMS);
router.post("/sms_verify", authCtrl_1.default.smsVerify);
router.post("/nonce", (0, express_validator_1.body)("address")
    .custom((value) => {
    return (0, ethereumjs_util_1.isValidAddress)(value);
})
    .withMessage("Must provide valid wallet address"), 
// body("nonce").notEmpty().withMessage("You nonce"),
validate_request_1.validateRequest, authCtrl_1.default.createNonce);
router.post("/metamask_login", (0, express_validator_1.body)("signature").notEmpty().withMessage("Provide Signed message"), (0, express_validator_1.body)("nonce").notEmpty().withMessage("Provide nonce"), 
// body("address").notEmpty().withMessage("Provide nonce"),
validate_request_1.validateRequest, authCtrl_1.default.metamaskLogin);
router.post("/forgot_password", authCtrl_1.default.forgotPassword);
exports.default = router;
