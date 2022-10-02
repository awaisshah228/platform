import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { Blog } from "../models/blogModel";
import { Category } from "../models/categoryModel";
import { IReqAuth } from "../utils/interface";
import { Comment } from "../models/commentModel";
import mongoose from "mongoose";
import { User } from "../models/userModel";
// import mongoose from 'mongoose'

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};
class APIfeatures {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

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
    } else {
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
  createBlog: async (req: IReqAuth, res: Response) => {
    const { title, content, description, category } = req.body;

    const categoryCheck: any = await Category.findOne({ name: category });
    console.log(categoryCheck);

    const newBlog: any = Blog.build({
      user: req.user?.id,
      title: title.toLowerCase(),
      content,
      description,
      thumbnail: req.file?.location,
      category: categoryCheck._id,
    });

    await newBlog.save();
    res.json({
      ...newBlog._doc,
      user: req.user,
      msg: "Blog created",
    });
    // res.json({...req.body,...req.file})
  },
  getTrendingBlogs: async (req: Request, res: Response) => {
    const blogs = await Blog.find({})
      .sort("-views -likes -createdAt")
      .select("-content")
      .limit(8)
      .populate("user")
      .populate("category");
    // console.log(blogs)
    // res.json('done')
    res.json(blogs);
  },
  getLatestBlogs: async (req: Request, res: Response) => {
    const features = new APIfeatures(
      Blog.find({})
        .sort("-createdAt")
        .select("-content")
        .populate("user")
        .populate("category"),
      req.query
    ).paginating();

    const blogs = await features.query;
    // console.log(blogs)
    // res.json('done')
    res.json(blogs);
  },
  getHomeBlogs: async (req: Request, res: Response) => {
    const blogs = await Blog.aggregate([
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
    ]);

    res.json(blogs);
  },
  getBlogsByCategory: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req);

    const Data = await Blog.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                category: new mongoose.Types.ObjectId(req.params.id),
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
                category: new mongoose.Types.ObjectId(req.params.id),
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
    } else {
      total = Math.floor(count / limit) + 1;
    }

    res.json({ blogs, total });
  },
  getBlogsByUser: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req);
    console.log(req.query);

    const Data = await Blog.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                user: new mongoose.Types.ObjectId(req.params.id),
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
                user: new mongoose.Types.ObjectId(req.params.id),
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
    } else {
      total = Math.floor(count / limit) + 1;
    }

    res.json({ blogs, total });
  },
  getBlog: async (req: Request, res: Response) => {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("user", "-password")
      .populate("category");
    console.log(req.ip);
    // console.log(req.socket.remoteAddress);

    if (!blog) throw new BadRequestError("Blog does not exist.");

    return res.json(blog);
  },
  updateBlog: async (req: IReqAuth, res: Response) => {
    const thumbnialCheck: any = await Blog.findOne({ _id: req.user?.id });
    const blog = await Blog.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user?.id,
      },
      {
        ...req.body,

        thumbnail: req.file ? req.file?.location : thumbnialCheck?.thumbnail,
      },
      {
        new: true,
      }
    );

    if (!blog) throw new BadRequestError("Invalid authentication");

    res.json({ msg: "Update Success!", blog });
  },
  deleteBlog: async (req: IReqAuth, res: Response) => {
    // Delete Blog
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!blog) throw new BadRequestError("Invalid auth");

    // Delete Comments
    await Comment.deleteMany({ blog_id: blog._id });

    res.json({ msg: "Delete Success!" });
  },
  searchBlogs: async (req: Request, res: Response) => {
    const blogs = await Blog.aggregate([
      {
        $search: {
          index: "searchTitle",
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

    if (!blogs.length) throw new BadRequestError("No blog found");

    res.json(blogs);
  },
  likeBlog: async (req: IReqAuth, res: Response) => {
    const post = await Blog.find({ _id: req.params.id, likes: req.user?.id });
    if (post.length > 0) throw new BadRequestError("You already like it");

    const like = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { likes: req.user?.id },
      },
      { new: true }
    );

    if (!like) throw new BadRequestError("This post does not exist.");

    res.json({ msg: "Liked Post!" });
  },
  unLikeBlog: async (req: IReqAuth, res: Response) => {
    const like = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { likes: req.user?.id },
      },
      { new: true }
    );

    if (!like) throw new BadRequestError("This post does not exist.");

    res.json({ msg: "UnLiked Post!" });
  },
  saveBlog: async (req: IReqAuth, res: Response) => {
    const user = await User.find({ _id: req.user?.id, saved: req.params.id });
    if (user.length > 0)
      return res.status(400).json({ msg: "You saved this post." });

    const save = await User.findOneAndUpdate(
      { _id: req.user?.id },
      {
        $push: { saved: req.params.id },
      },
      { new: true }
    );

    if (!save) throw new BadRequestError("This user does not exist.");

    res.json({ msg: "Saved Post!" });
  },
  unSaveBlog: async (req: IReqAuth, res: Response) => {
    const save = await User.findOneAndUpdate(
      { _id: req.user?.id },
      {
        $pull: { saved: req.params.id },
      },
      { new: true }
    );

    if (!save) throw new BadRequestError("This user does not exist.");

    res.json({ msg: "unSaved Post!" });
  },
  getSaveBlogs: async (req: IReqAuth, res: Response) => {
    const features = new APIfeatures(
      Blog.find({
        _id: { $in: req.user?.saved },
      }),
      req.query
    ).paginating();

    const savePosts = await features.query.sort("-createdAt");

    res.json({
      savePosts,
      result: savePosts.length,
    });
  },
};

export default blogCtrl;
