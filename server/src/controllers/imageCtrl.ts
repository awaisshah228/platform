import {Request,Response} from 'express'
import { ReadStream } from 'fs';

type IRequest= Request &{
   file?: any
}
const imageCtrl={

    uploadImage:(req:IRequest,res:Response)=>{
        // console.log(req.body)
        // console.log(req.file)

        res.json({path:req.file?.location})
    }

}

export default imageCtrl;