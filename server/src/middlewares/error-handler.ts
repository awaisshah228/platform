import {Request, Response, NextFunction} from 'express';
import {CustomError} from '../errors/custom-errors';
interface IError extends Error{
   keyValue?: any;
   code?: any
}
export const errorHandler = (
    err: IError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  // console.log("hi")
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }
  // const tokenExpire: any=JSON.stringify(err)
  // console.log(tokenExpire.name)
  if(err.name=='TokenExpiredError'){
    return  res.status(401).send({
      errors: [err],
    });

  }
  console.log(err)
  if(err.code === 11000){
    let message = Object.values(err.keyValue)[0] + " already exists."
    return res.status(400).send({errors:[{message}]});
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
