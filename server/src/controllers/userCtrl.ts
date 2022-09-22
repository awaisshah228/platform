import { Request, Response } from "express";
import { IReqAuth } from "../utils/interface";
import { User } from "../models/userModel";
import { NotFoundError } from "../errors";
import { IUser } from './../utils/interface';
import { BadRequestError } from './../errors/bad-request-error';



const userCtrl = {
  updateUser: async (req: IReqAuth, res: Response) => {
    const { name } = req.body;
    
    if(!req.body.name){
      throw new BadRequestError("Name is not suppliend")
    }
    const user:any=await User.find({_id:req.user?._id })

    const updateUser= await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        avatar: req.file? req.file?.location : user?.avatar,
        name,
      }
    );
    res.json({ msg: "success",user: updateUser})
     // res.json({ msg: "Update Success!" })
  },
  resetPassword: async (req: IReqAuth, res: Response) => {
    const { password } = req.body;

    await User.findOneAndUpdate(
      { _id: req.user?._id },
      {
        password: password,
      }
    );

    res.json({ msg: "Reset Password Success!" });
  },
  getUser: async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError();
    }
    res.json(user);
  },
};

export default userCtrl;
