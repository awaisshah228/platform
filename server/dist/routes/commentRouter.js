"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import auth from '../middleware/auth'
const router = express_1.default.Router();
// router.post('/comment', auth, commentCtrl.createComment)
// router.get('/comments/blog/:id', commentCtrl.getComments)
// router.post('/reply_comment', auth, commentCtrl.replyComment)
// router.patch('/comment/:id', auth, commentCtrl.updateComment)
// router.delete('/comment/:id', auth, commentCtrl.deleteComment)
exports.default = router;
