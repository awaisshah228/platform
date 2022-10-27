"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageCtrl_1 = __importDefault(require("../controllers/imageCtrl"));
const upload_file_1 = __importDefault(require("../middlewares/upload-file"));
const require_auth_1 = require("../middlewares/require-auth");
const router = express_1.default.Router();
router.post('/', require_auth_1.requireAuth, upload_file_1.default.single('image'), imageCtrl_1.default.uploadImage);
exports.default = router;
