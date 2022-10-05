import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { IDecodedToken, IReqAuth } from "../utils/interface";

export const adminAuth = (req: IReqAuth, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin"|| "user") {
    throw new NotAuthorizedError();
  }

  next();
};
