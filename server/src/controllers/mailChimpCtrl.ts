import { addMember } from "../utils/mailChimp";
import { Request,Response } from 'express';
import { BadRequestError } from './../errors/bad-request-error';



const subscribed={
    subscribeNews:async(req:Request,res:Response)=>{

        

        const { firstName, lastName, email } = req.body;

        if(!email){
            throw new BadRequestError('Please provide email');
        }

       const mailCheck= await addMember(email);
       console.log(mailCheck )

       return res.json(mailCheck)
       
        


       

    }
}

export default subscribed