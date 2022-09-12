import { Request, Response, NextFunction } from 'express';
import {NotAuthorizedError} from "../errors/not-authorized-error";
import { IDecodedToken, IReqAuth } from '../utils/interface'


export const requireAuth = (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
    if(!req.user){
        throw new NotAuthorizedError();
    }

    next()
};


