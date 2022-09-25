import mongoose from "mongoose";

interface BlogAttrs {
    user: string
    title: string
    content: string
    description: string
    thumbnail: string
    category: string
}

interface BlogModel extends mongoose.Model<BlogDoc> {
  build(attrs: BlogAttrs): BlogDoc;
}
interface BlogDoc extends mongoose.Document {
    user: string
    title: string
    content: string
    description: string
    thumbnail: string
    category: string
}

const blogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      require: true,
      trim: true,
      minLength: 10,
      maxLength: 50,
    },
    content: {
      type: String,
      require: true,
      minLength: 500,
    },
    description: {
      type: String,
      require: true,
      trim: true,
      minLength: 50,
      maxLength: 200,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
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

blogSchema.statics.build = (attrs: BlogAttrs) => {
  return new Blog(attrs);
};

const Blog = mongoose.model<BlogDoc, BlogModel>("Blog", blogSchema);

export  { Blog };

