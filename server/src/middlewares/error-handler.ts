import {Request, Response, NextFunction} from 'express';
import {CustomError} from '../errors/custom-errors';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  // console.log("hi")
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }
  // const tokenExpire: any=JSON.stringify(err)
  console.log(err.name)
  // console.log(tokenExpire.name)
  if(err.name=='TokenExpiredError'){
    return  res.status(401).send({
      errors: [err],
    });

  }
  
  if(err){
    return  res.status(400).send({
      errors: [err],
    });
  }
  res.status(400).send({
    errors: ["something went wrong "],
  });

  
};
