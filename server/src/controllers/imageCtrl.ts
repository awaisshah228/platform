import {Request,Response} from 'express'
import { ReadStream } from 'fs';

type IRequest= Request &{
   file?: any
}
const imageCtrl={

    uploadImage:(req:IRequest,res:Response)=>{

        res.json({path:req.file?.location})
    }

}

export default imageCtrl;