import { Request, Response } from 'express'
import { BadRequestError } from '../errors';
import {Blog} from '../models/blogModel'
import { Category } from '../models/categoryModel';
import { IReqAuth } from '../utils/interface'
// import mongoose from 'mongoose'


const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
}

const blogCtrl = {
  createBlog: async (req: IReqAuth, res: Response) => {

    // console.log(req.body)

    // if(!req.body.title){
    //     throw new BadRequestError("Title is not suppliend")
    //   }
    //   if(!req.body.content){
    //     throw new BadRequestError("Content to be supplied")
    //   }

      const { title, content, description, category } = req.body

      const categoryCheck:any= await Category.findOne({name: category})
      console.log(categoryCheck)

      const newBlog:any = new Blog({
        user: req.user?.id,
        title: title.toLowerCase(), 
        content,
        description, 
        thumbnail:req.file?.location,
        category :  categoryCheck._id
      })

      await newBlog.save()
      res.json({
        ...newBlog._doc,
        user: req.user,
        msg: "Blog created"
      })
    // res.json({...req.body,...req.file})

   
  },
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
  getBlog: async (req: Request, res: Response) => {
      const blog = await Blog.findOne({_id: req.params.id})
      .populate("user", "-password")

      if(!blog) throw new BadRequestError("Blog does not exist.")

      return res.json(blog)
  
  },
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
}


export default blogCtrl;