"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
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
    category: { type: mongoose_1.default.Types.ObjectId, ref: "Category" },
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
blogSchema.statics.build = (attrs) => {
    return new Blog(attrs);
};
const Blog = mongoose_1.default.model("Blog", blogSchema);
exports.Blog = Blog;
