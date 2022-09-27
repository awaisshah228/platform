import mongoose from "mongoose";
interface CommentsAttrs {
  user: string;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM: [];
  reply_user: string;
  comment_root: string;
}

// An interface that describes the properties
// that a User Model has
interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentsAttrs): CommentDoc;
}

// An interface that describes the properties
// that a User Document has
interface CommentDoc extends mongoose.Document {
  user: string;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM: [];
  reply_user: string;
  comment_root: string;
}

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    blog_id: mongoose.Types.ObjectId,
    blog_user_id: mongoose.Types.ObjectId,
    content: { type: String, required: true },
    replyCM: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    reply_user: { type: mongoose.Types.ObjectId, ref: "User" },
    comment_root: { type: mongoose.Types.ObjectId, ref: "Comment" },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // console.log(doc)
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
commentSchema.statics.build = (attrs: CommentsAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  "Comment",
  commentSchema
);

export { Comment };

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
