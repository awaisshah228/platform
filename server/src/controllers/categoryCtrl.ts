import { Request, Response } from "express";
import { Category } from "../models/categoryModel";
import { Blog } from "../models/blogModel";

import { IReqAuth } from "../utils/interface";
import { BadRequestError } from "./../errors/bad-request-error";

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
  updateCategory: async (req: IReqAuth, res: Response) => {
    const category = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { name: req.body.name.toLowerCase() },{new:true}
    );

    res.json({ msg: "Update Success!", category });
  },
  deleteCategory: async (req: IReqAuth, res: Response) => {
    const blog = await Blog.findOne({ category: req.params.id });
    if (blog)
      throw new BadRequestError(
        "Can not delete! In this category also exist blogs."
      );

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) throw new BadRequestError("Category does not exists.");
    res.json({ msg: "Delete Success!",category });
  },
};

export default categoryCtrl;
