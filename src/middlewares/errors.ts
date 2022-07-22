import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status: number = err.status || 500;
  const error: string | [] = err.message || 'Something went wrong';

  res.status(status).json({ error });

  next();
};

export default errorHandler;
