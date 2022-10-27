"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const blogModel_1 = require("../models/blogModel");
const categoryModel_1 = require("../models/categoryModel");
const commentModel_1 = require("../models/commentModel");
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("../models/userModel");
// import mongoose from 'mongoose'
const Pagination = (req) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 4;
    let skip = (page - 1) * limit;
    return { page, limit, skip };
};
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = Object.assign({}, this.queryString); //queryString = req.query
        const excludedFields = ["page", "sort", "limit"];
        excludedFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => "$" + match);
        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 8;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
const blogCtrl = {
    createBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { title, content, description, category, type } = req.body;
        const categoryCheck = yield categoryModel_1.Category.findOne({ name: category });
        console.log(categoryCheck);
        const newBlog = blogModel_1.Blog.build({
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            title: title.toLowerCase(),
            content,
            description,
            thumbnail: (_b = req.file) === null || _b === void 0 ? void 0 : _b.location,
            category: categoryCheck._id,
            type
        });
        yield newBlog.save();
        res.json(Object.assign(Object.assign({}, newBlog._doc), { user: req.user, msg: "Blog created" }));
        // res.json({...req.body,...req.file})
    }),
    getTrendingBlogs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blogs = yield blogModel_1.Blog.find({})
            .sort("-views -likes -createdAt")
            .select("-content")
            .limit(8)
            .populate("user")
            .populate("category");
        // console.log(blogs)
        // res.json('done')
        res.json(blogs);
    }),
    getLatestBlogs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const features = new APIfeatures(blogModel_1.Blog.find({})
            .sort("-createdAt")
            .select("-content")
            .populate("user")
            .populate("category"), req.query).paginating();
        const blogs = yield features.query;
        // console.log(blogs)
        // res.json('done')
        res.json(blogs);
    }),
    getHomeBlogs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blogs = yield blogModel_1.Blog.aggregate([
            // User
            {
                $lookup: {
                    from: "users",
                    let: { user_id: "$user" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                        { $project: { password: 0 } },
                    ],
                    as: "user",
                },
            },
            // array -> object
            { $unwind: "$user" },
            // Category
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            // array -> object
            { $unwind: "$category" },
            // Sorting
            // { $sort: {
            //   //  createdAt: -1,
            //   name:1 } },
            {
                $project: {
                    content: 0,
                },
            },
            // Group by category
            {
                $group: {
                    _id: "$category._id",
                    name: { $first: "$category.name" },
                    blogs: { $push: "$$ROOT" },
                    count: { $sum: 1 },
                },
            },
            // Pagination for blogs
            {
                $project: {
                    blogs: {
                        $slice: ["$blogs", 0, 5],
                        // content: -1
                    },
                    count: 1,
                    name: 1,
                },
            },
            {
                $sort: {
                    name: 1,
                },
            },
            {
                $match: {
                    name: {
                        $in: ['mern', 'devops']
                    }
                }
            },
        ]);
        res.json(blogs);
    }),
    getBlogsByCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit, skip } = Pagination(req);
        const Data = yield blogModel_1.Blog.aggregate([
            {
                $facet: {
                    totalData: [
                        {
                            $match: {
                                category: new mongoose_1.default.Types.ObjectId(req.params.id),
                            },
                        },
                        // User
                        {
                            $lookup: {
                                from: "users",
                                let: { user_id: "$user" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                    { $project: { password: 0 } },
                                ],
                                as: "user",
                            },
                        },
                        // array -> object
                        { $unwind: "$user" },
                        // Sorting
                        { $sort: { createdAt: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    totalCount: [
                        {
                            $match: {
                                category: new mongoose_1.default.Types.ObjectId(req.params.id),
                            },
                        },
                        { $count: "count" },
                    ],
                },
            },
            {
                $project: {
                    count: { $arrayElemAt: ["$totalCount.count", 0] },
                    totalData: 1,
                },
            },
        ]);
        const blogs = Data[0].totalData;
        const count = Data[0].count;
        // Pagination
        let total = 0;
        if (count % limit === 0) {
            total = count / limit;
        }
        else {
            total = Math.floor(count / limit) + 1;
        }
        res.json({ blogs, total });
    }),
    getBlogsByUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit, skip } = Pagination(req);
        console.log(req.query);
        const Data = yield blogModel_1.Blog.aggregate([
            {
                $facet: {
                    totalData: [
                        {
                            $match: {
                                user: new mongoose_1.default.Types.ObjectId(req.params.id),
                            },
                        },
                        // User
                        {
                            $lookup: {
                                from: "users",
                                let: { user_id: "$user" },
                                pipeline: [
                                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                                    { $project: { password: 0 } },
                                ],
                                as: "user",
                            },
                        },
                        // array -> object
                        { $unwind: "$user" },
                        {
                            $lookup: {
                                from: "categories",
                                localField: "category",
                                foreignField: "_id",
                                as: "category",
                            },
                        },
                        // array -> object
                        { $unwind: "$category" },
                        // Sorting
                        { $sort: { createdAt: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                        { $project: { content: 0 } },
                    ],
                    totalCount: [
                        {
                            $match: {
                                user: new mongoose_1.default.Types.ObjectId(req.params.id),
                            },
                        },
                        { $count: "count" },
                    ],
                },
            },
            {
                $project: {
                    count: { $arrayElemAt: ["$totalCount.count", 0] },
                    totalData: 1,
                },
            },
        ]);
        const blogs = Data[0].totalData;
        const count = Data[0].count;
        // Pagination
        let total = 0;
        if (count % limit === 0) {
            total = count / limit;
        }
        else {
            total = Math.floor(count / limit) + 1;
        }
        res.json({ blogs, total });
    }),
    getBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield blogModel_1.Blog.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } }, { new: true })
            .populate("user", "-password")
            .populate("category");
        // console.log(blog);
        // console.log(req.socket.remoteAddress);
        if (!blog)
            throw new errors_1.BadRequestError("Blog does not exist.");
        if (blog.type == 'free') {
            return res.json(blog);
        }
        // console.log({...blog})
        return res.json(Object.assign(Object.assign({}, blog === null || blog === void 0 ? void 0 : blog._doc), { content: blog.content.split(' ').slice(0, 100).join(' ') }));
    }),
    updateBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d, _e;
        const thumbnialCheck = yield blogModel_1.Blog.findOne({ _id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id });
        const blog = yield blogModel_1.Blog.findOneAndUpdate({
            _id: req.params.id,
            user: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id,
        }, Object.assign(Object.assign({}, req.body), { thumbnail: req.file ? (_e = req.file) === null || _e === void 0 ? void 0 : _e.location : thumbnialCheck === null || thumbnialCheck === void 0 ? void 0 : thumbnialCheck.thumbnail }), {
            new: true,
        });
        if (!blog)
            throw new errors_1.BadRequestError("Invalid authentication");
        res.json({ msg: "Update Success!", blog });
    }),
    deleteBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        // Delete Blog
        const blog = yield blogModel_1.Blog.findOneAndDelete({
            _id: req.params.id,
            user: (_f = req.user) === null || _f === void 0 ? void 0 : _f.id,
        });
        if (!blog)
            throw new errors_1.BadRequestError("Invalid auth");
        // Delete Comments
        yield commentModel_1.Comment.deleteMany({ blog_id: blog._id });
        res.json({ msg: "Delete Success!" });
    }),
    searchBlogs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blogs = yield blogModel_1.Blog.aggregate([
            {
                $search: {
                    index: "search",
                    autocomplete: {
                        query: `${req.query.title}`,
                        path: "title",
                    },
                },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
                $project: {
                    title: 1,
                    description: 1,
                    thumbnail: 1,
                    createdAt: 1,
                },
            },
        ]);
        if (!blogs.length)
            throw new errors_1.BadRequestError("No blog found");
        res.json(blogs);
    }),
    likeBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h;
        const post = yield blogModel_1.Blog.find({ _id: req.params.id, likes: (_g = req.user) === null || _g === void 0 ? void 0 : _g.id });
        if (post.length > 0)
            throw new errors_1.BadRequestError("You already like it");
        const like = yield blogModel_1.Blog.findOneAndUpdate({ _id: req.params.id }, {
            $push: { likes: (_h = req.user) === null || _h === void 0 ? void 0 : _h.id },
        }, { new: true });
        if (!like)
            throw new errors_1.BadRequestError("This post does not exist.");
        res.json({ msg: "Liked Post!" });
    }),
    unLikeBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _j;
        const like = yield blogModel_1.Blog.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { likes: (_j = req.user) === null || _j === void 0 ? void 0 : _j.id },
        }, { new: true });
        if (!like)
            throw new errors_1.BadRequestError("This post does not exist.");
        res.json({ msg: "UnLiked Post!" });
    }),
    saveBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _k, _l;
        const user = yield userModel_1.User.find({ _id: (_k = req.user) === null || _k === void 0 ? void 0 : _k.id, saved: req.params.id });
        if (user.length > 0)
            return res.status(400).json({ msg: "You saved this post." });
        const save = yield userModel_1.User.findOneAndUpdate({ _id: (_l = req.user) === null || _l === void 0 ? void 0 : _l.id }, {
            $push: { saved: req.params.id },
        }, { new: true });
        if (!save)
            throw new errors_1.BadRequestError("This user does not exist.");
        res.json({ msg: "Saved Post!" });
    }),
    unSaveBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _m;
        const save = yield userModel_1.User.findOneAndUpdate({ _id: (_m = req.user) === null || _m === void 0 ? void 0 : _m.id }, {
            $pull: { saved: req.params.id },
        }, { new: true });
        if (!save)
            throw new errors_1.BadRequestError("This user does not exist.");
        res.json({ msg: "unSaved Post!" });
    }),
    getSaveBlogs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _o;
        const features = new APIfeatures(blogModel_1.Blog.find({
            _id: { $in: (_o = req.user) === null || _o === void 0 ? void 0 : _o.saved },
        }), req.query).paginating();
        const savePosts = yield features.query.sort("-createdAt");
        res.json({
            savePosts,
            result: savePosts.length,
        });
    }),
    getFeatureBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield blogModel_1.Blog.aggregate([
            //lookup
            {
                $lookup: {
                    from: "users",
                    let: { user_id: "$user" },
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ["$_id", "$$user_id"] }, role: "admin" },
                        },
                        { $project: { password: 0 } },
                    ],
                    as: "user",
                },
            },
            // array -> object
            //
            { $unwind: "$user" },
            // {
            //   $project: {
            //     content: 0,
            //   },
            // },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $limit: 1,
            },
            //
            // {
            //   $match:{
            //     role:'user'
            //   }
            // }
        ]);
        res.json(blog[0]);
    }),
};
exports.default = blogCtrl;
