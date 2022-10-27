"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    blog_id: mongoose_1.default.Types.ObjectId,
    blog_user_id: mongoose_1.default.Types.ObjectId,
    content: { type: String, required: true },
    replyCM: [{ type: mongoose_1.default.Types.ObjectId, ref: "Comment" }],
    reply_user: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    comment_root: { type: mongoose_1.default.Types.ObjectId, ref: "Comment" },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            // console.log(doc)
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
commentSchema.statics.build = (attrs) => {
    return new Comment(attrs);
};
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.Comment = Comment;
// import mongoose from 'mongoose'
// import { IComment } from '../config/interface'
// const commentSchema = new mongoose.Schema({
//   user: { type: mongoose.Types.ObjectId, ref: 'user' },
//   blog_id: mongoose.Types.ObjectId,
//   blog_user_id: mongoose.Types.ObjectId,
//   content: { type: String, required: true },
//   replyCM: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
//   reply_user: { type: mongoose.Types.ObjectId, ref: 'user' },
//   comment_root: { type: mongoose.Types.ObjectId, ref: 'comment' }
// }, {
//   timestamps: true
// })
// export default mongoose.model<IComment>('comment', commentSchema)
