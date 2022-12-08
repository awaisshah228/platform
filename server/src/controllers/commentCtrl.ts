import { Request, Response } from 'express'
import {Comment} from '../models/commentModel'
import { IReqAuth } from '../utils/interface'
import mongoose from 'mongoose'
import { BadRequestError } from './../errors/bad-request-error';


const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
}

const commentCtrl = {
  createComment: async (req: IReqAuth, res: Response) => {
   

   
      const { 
        content,
        blog_id,
        blog_user_id
      } = req.body

      const newComment = new Comment({ 
        user: req.user?.id,
        content,
        blog_id,
        blog_user_id
      })

      await newComment.save()

      return res.json(newComment)
   
  },
  getComments: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req)

  
      const data = await Comment.aggregate([
        {
          $facet: {
            totalData:[
              { $match: {
                blog_id: new mongoose.Types.ObjectId(req.params.id),
                comment_root: { $exists: false },
                reply_user: { $exists: false }
              }},
              {
                $lookup: {
                  "from": "users",
                  "let": { user_id: "$user" },
                  "pipeline": [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { name: 1, avatar: 1 } }
                  ], 
                  "as": "user"
                }
              },
              { $unwind: "$user" },
              {
                $lookup: {
                  "from": "comments",
                  "let": { cm_id: "$replyCM" },
                  "pipeline": [
                    { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
                    {
                      $lookup: {
                        "from": "users",
                        "let": { user_id: "$user" },
                        "pipeline": [
                          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                          { $project: { name: 1, avatar: 1 } }
                        ], 
                        "as": "user"
                      }
                    },
                    { $unwind: "$user" },
                    {
                      $lookup: {
                        "from": "users",
                        "let": { user_id: "$reply_user" },
                        "pipeline": [
                          { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                          { $project: { name: 1, avatar: 1 } }
                        ], 
                        "as": "reply_user"
                      }
                    },
                    { $unwind: "$reply_user" }
                  ],
                  "as": "replyCM"
                }
              },
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { $match: {
                blog_id: new mongoose.Types.ObjectId(req.params.id),
                comment_root: { $exists: false },
                reply_user: { $exists: false }
              }},
              { $count: 'count' }
            ]
          }
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1
          }
        }
      ])

      const comments = data[0].totalData;
      const count = data[0].count;

      let total = 0;

      if(count % limit === 0){
        total = count / limit;
      }else{
        total = Math.floor(count / limit) + 1;
      }

      return res.json({ comments, total })
      
  },
  replyComment: async (req: IReqAuth, res: Response) => {
  

    
      const { 
        content,
        blog_id,
        blog_user_id,
        comment_root,
        reply_user
      } = req.body


      const newComment = new Comment({ 
        user: req.user?.id,
        content,
        blog_id,
        blog_user_id,
        comment_root,
        reply_user: reply_user._id
      })

      await Comment.findOneAndUpdate({_id: comment_root}, {
        $push: { replyCM: newComment._id }
      })

      await newComment.save()

      return res.json(newComment)
      
  },
  updateComment: async (req: IReqAuth, res: Response) => {
    
      const { content } = req.body

      const comment = await Comment.findOneAndUpdate({
        _id: req.params.id, user: req.user?.id
      }, { content })

      if(!comment)
      throw new BadRequestError("Comment does not exits.")

      return res.json({msg: "Update Success!"})
      
   
  },
  deleteComment: async (req: IReqAuth, res: Response) => {
   


      const comment = await Comment.findOneAndDelete({
        _id: req.params.id, 
        $or: [
          { user: req.user?._id },
          { blog_user_id: req.user?._id}
        ]
      })

      if(!comment)
       throw new BadRequestError("Comment does not exits.")

      if(comment.comment_root){
        // update replyCM
        await Comment.findOneAndUpdate({_id: comment.comment_root}, {
          $pull: { replyCM: comment._id }
        })
      }else{
        // delete all comments in replyCM
        await Comment.deleteMany({_id: {$in: comment.replyCM}})
      }

      return res.json({msg: "Delete Success!"})
      
  
  }
}

export default commentCtrl;