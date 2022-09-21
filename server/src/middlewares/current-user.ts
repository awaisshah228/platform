import { Response, NextFunction} from 'express'
import {User} from '../models/userModel'
import jwt from 'jsonwebtoken'
import { IDecodedToken, IReqAuth } from '../utils/interface'

const currentUser = async (req: IReqAuth, res: Response, next: NextFunction) => {

    try {
        const token = req.header("Authorization")
        if(!token)  return next();
    
        const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    
        const user = await User.findOne({_id: decoded.id})
        if(!user) return next();
    
        req.user = user;
        
    } catch (error) {
        
        
    }
    next()
   

    
 
}

export default currentUser;


// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface UserPayload {
//   id: string;
//   email: string;
// }

// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: UserPayload;
//     }
//   }
// }

// export const currentUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session?.jwt) {
//     return next();
//   }

//   try {
//     const payload = jwt.verify(
//       req.session.jwt,
//       process.env.JWT_KEY!
//     ) as UserPayload;
//     req.currentUser = payload;
//   } catch (err) {}

//   next();
// };