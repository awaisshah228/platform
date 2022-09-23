import { Request, Response } from "express";
import { Category } from "../models/categoryModel";
import { Blog } from "../models/blogModel";

import { IReqAuth } from "../utils/interface";

const categoryCtrl = {
  createCategory: async (req: IReqAuth, res: Response) => {
    const name = req.body.name.toLowerCase();

    const newCategory = new Category({ name });
    await newCategory.save();

    res.json({ newCategory });
  },
  getCategories: async (req: Request, res: Response) => {
    const categories = await Category.find().sort("-createdAt");
    res.json({ categories });
  },
  //   updateCategory: async (req: IReqAuth, res: Response) => {
  //     if(!req.user) return res.status(400).json({msg: "Invalid Authentication."})

  //     if(req.user.role !== 'admin')
  //       return res.status(400).json({msg: "Invalid Authentication."})

  //     try {
  //       const category = await Categories.findOneAndUpdate({
  //         _id: req.params.id
  //       }, { name: (req.body.name).toLowerCase() })

  //       res.json({ msg: "Update Success!" })
  //     } catch (err: any) {
  //       return res.status(500).json({ msg: err.message })
  //     }
  //   },
  //   deleteCategory: async (req: IReqAuth, res: Response) => {
  //     if(!req.user) return res.status(400).json({msg: "Invalid Authentication."})

  //     if(req.user.role !== 'admin')
  //       return res.status(400).json({msg: "Invalid Authentication."})

  //     try {
  //       const blog = await Blogs.findOne({category: req.params.id})
  //       if(blog)
  //         return res.status(400).json({
  //           msg: "Can not delete! In this category also exist blogs."
  //         })

  //       const category = await Categories.findByIdAndDelete(req.params.id)
  //       if(!category)
  //         return res.status(400).json({msg: "Category does not exists."})

  //       res.json({ msg: "Delete Success!" })
  //     } catch (err: any) {
  //       return res.status(500).json({ msg: err.message })
  //     }
  //   }
};

export default categoryCtrl;
