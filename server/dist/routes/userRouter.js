"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userCtrl_1 = __importDefault(require("../controllers/userCtrl"));
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middlewares/validate-request");
const require_auth_1 = require("../middlewares/require-auth");
const upload_file_1 = __importDefault(require("../middlewares/upload-file"));
const router = express_1.default.Router();
router.patch("/", require_auth_1.requireAuth, upload_file_1.default.single("file"), [(0, express_validator_1.body)("name").notEmpty().withMessage("You must supply a name"),
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.body)("account").isEmail().withMessage("Email must be valid"),
        (0, express_validator_1.body)("account")
            .custom((value) => {
            const re = /^[+]/g;
            return re.test(value);
        })
            .withMessage("Must provide number"),
    ]),
], validate_request_1.validateRequest, userCtrl_1.default.updateUser);
router.patch("/reset_password", require_auth_1.requireAuth, [(0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),], validate_request_1.validateRequest, userCtrl_1.default.resetPassword);
router.get("/:id", userCtrl_1.default.getUser);
exports.default = router;
