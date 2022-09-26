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
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const blogModel_1 = require("../models/blogModel");
const categoryModel_1 = require("../models/categoryModel");
// import mongoose from 'mongoose'
const Pagination = (req) => {
    let page = Number(req.query.page) * 1 || 1;
    let limit = Number(req.query.limit) * 1 || 4;
    let skip = (page - 1) * limit;
    return { page, limit, skip };
};
const blogCtrl = {
    createBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(req.body)
        var _a, _b;
        // if(!req.body.title){
        //     throw new BadRequestError("Title is not suppliend")
        //   }
        //   if(!req.body.content){
        //     throw new BadRequestError("Content to be supplied")
        //   }
        const { title, content, description, category } = req.body;
        const categoryCheck = yield categoryModel_1.Category.findOne({ name: category });
        console.log(categoryCheck);
        const newBlog = new blogModel_1.Blog({
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            title: title.toLowerCase(),
            content,
            description,
            thumbnail: (_b = req.file) === null || _b === void 0 ? void 0 : _b.location,
            category: categoryCheck._id
        });
        yield newBlog.save();
        res.json(Object.assign(Object.assign({}, newBlog._doc), { user: req.user, msg: "Blog created" }));
        // res.json({...req.body,...req.file})
    }),
    //   getHomeBlogs: async (req: Request, res: Response) => {
    //     try {
    //       const blogs = await Blog.aggregate([
    //         // User
    //         {
    //           $lookup:{
    //             from: "users",
    //             let: { user_id: "$user" },
    //             pipeline: [
    //               { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
    //               { $project: { password: 0 }}
    //             ],
    //             as: "user"
    //           }
    //         },
    //         // array -> object
    //         { $unwind: "$user" },
    //         // Category
    //         {
    //           $lookup: {
    //             "from": "categories",
    //             "localField": "category",
    //             "foreignField": "_id",
    //             "as": "category"
    //           }
    //         },
    //         // array -> object
    //         { $unwind: "$category" },
    //         // Sorting
    //         { $sort: { "createdAt": -1 } },
    //         // Group by category
    //         {
    //           $group: {
    //             _id: "$category._id",
    //             name: { $first: "$category.name" },
    //             blogs: { $push: "$$ROOT" },
    //             count: { $sum: 1 }
    //           }
    //         },
    //         // Pagination for blogs
    //         {
    //           $project: {
    //             blogs: {
    //               $slice: ['$blogs', 0, 4]
    //             },
    //             count: 1,
    //             name: 1
    //           }
    //         }
    //       ])
    //       res.json(blogs)
    //     } catch (err: any) {
    //       return res.status(500).json({msg: err.message})
    //     }
    //   },
    //   getBlogsByCategory: async (req: Request, res: Response) => {
    //     const { limit, skip } = Pagination(req)
    //     try {
    //       const Data = await Blog.aggregate([
    //         {
    //           $facet: {
    //             totalData: [
    //               { 
    //                 $match:{ 
    //                   category: new mongoose.Types.ObjectId(req.params.id) 
    //                 } 
    //               },
    //               // User
    //               {
    //                 $lookup:{
    //                   from: "users",
    //                   let: { user_id: "$user" },
    //                   pipeline: [
    //                     { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
    //                     { $project: { password: 0 }}
    //                   ],
    //                   as: "user"
    //                 }
    //               },
    //               // array -> object
    //               { $unwind: "$user" },
    //               // Sorting
    //               { $sort: { createdAt: -1 } },
    //               { $skip: skip },
    //               { $limit: limit }
    //             ],
    //             totalCount: [
    //               { 
    //                 $match: { 
    //                   category: new mongoose.Types.ObjectId(req.params.id) 
    //                 } 
    //               },
    //               { $count: 'count' }
    //             ]
    //           }
    //         },
    //         {
    //           $project: {
    //             count: { $arrayElemAt: ["$totalCount.count", 0] },
    //             totalData: 1
    //           }
    //         }
    //       ])
    //       const blogs = Data[0].totalData;
    //       const count = Data[0].count;
    //       // Pagination
    //       let total = 0;
    //       if(count % limit === 0){
    //         total = count / limit;
    //       }else {
    //         total = Math.floor(count / limit) + 1;
    //       }
    //       res.json({ blogs, total })
    //     } catch (err: any) {
    //       return res.status(500).json({msg: err.message})
    //     }
    //   },
    //   getBlogsByUser: async (req: Request, res: Response) => {
    //     const { limit, skip } = Pagination(req)
    //     try {
    //       const Data = await Blog.aggregate([
    //         {
    //           $facet: {
    //             totalData: [
    //               { 
    //                 $match:{ 
    //                   user: new mongoose.Types.ObjectId(req.params.id) 
    //                 } 
    //               },
    //               // User
    //               {
    //                 $lookup:{
    //                   from: "users",
    //                   let: { user_id: "$user" },
    //                   pipeline: [
    //                     { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
    //                     { $project: { password: 0 }}
    //                   ],
    //                   as: "user"
    //                 }
    //               },
    //               // array -> object
    //               { $unwind: "$user" },
    //               // Sorting
    //               { $sort: { createdAt: -1 } },
    //               { $skip: skip },
    //               { $limit: limit }
    //             ],
    //             totalCount: [
    //               { 
    //                 $match: { 
    //                   user: new mongoose.Types.ObjectId(req.params.id) 
    //                 } 
    //               },
    //               { $count: 'count' }
    //             ]
    //           }
    //         },
    //         {
    //           $project: {
    //             count: { $arrayElemAt: ["$totalCount.count", 0] },
    //             totalData: 1
    //           }
    //         }
    //       ])
    //       const blogs = Data[0].totalData;
    //       const count = Data[0].count;
    //       // Pagination
    //       let total = 0;
    //       if(count % limit === 0){
    //         total = count / limit;
    //       }else {
    //         total = Math.floor(count / limit) + 1;
    //       }
    //       res.json({ blogs, total })
    //     } catch (err: any) {
    //       return res.status(500).json({msg: err.message})
    //     }
    //   },
    getBlog: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield blogModel_1.Blog.findOne({ _id: req.params.id })
            .populate("user", "-password");
        if (!blog)
            throw new errors_1.BadRequestError("Blog does not exist.");
        return res.json(blog);
    }),
    //   updateBlog: async (req: IReqAuth, res: Response) => {
    //     if(!req.user) 
    //       return res.status(400).json({msg: "Invalid Authentication."})
    //     try {
    //       const blog = await Blog.findOneAndUpdate({
    //         _id: req.params.id, user: req.user._id
    //       }, req.body)
    //       if(!blog) return res.status(400).json({msg: "Invalid Authentication."})
    //       res.json({ msg: 'Update Success!', blog })
    //     } catch (err: any) {
    //       return res.status(500).json({msg: err.message})
    //     }
    //   },
    //   deleteBlog: async (req: IReqAuth, res: Response) => {
    //     if(!req.user) 
    //       return res.status(400).json({msg: "Invalid Authentication."})
    //     try {
    //       // Delete Blog
    //       const blog = await Blog.findOneAndDelete({
    //         _id: req.params.id, user: req.user._id
    //       })
    //       if(!blog) 
    //         return res.status(400).json({msg: "Invalid Authentication."})
    //       // Delete Comments
    //     //   await Comments.deleteMany({ blog_id: blog._id })
    //       res.json({ msg: 'Delete Success!' })
    //     } catch (err: any) {
    //       return res.status(500).json({msg: err.message})
    //     }
    //   },
    //   searchBlogs: async (req: Request, res: Response) => {
    //     try {
    //       const blogs = await Blog.aggregate([
    //         {
    //           $search: {
    //             index: "searchTitle",
    //             autocomplete: {
    //               "query": `${req.query.title}`,
    //               "path": "title"
    //             }
    //           }
    //         },
    //         { $sort: { createdAt: -1 } },
    //         { $limit: 5},
    //         {
    //           $project: {
    //             title: 1,
    //             description: 1,
    //             thumbnail: 1,
    //             createdAt: 1
    //           }
    //         }
    //       ])
    //       if(!blogs.length)
    //         return res.status(400).json({msg: 'No Blogs.'})
    //       res.json(blogs)
    //     } catch (err: any) {
    //       return res.status(500).json({msg: err.message})
    //     }
    //   },
};
exports.default = blogCtrl;
