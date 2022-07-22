import express, { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { User } from '../users/interfaces';
import serviceUser from '../users/services';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const accessToken: string = await serviceUser.login(username, password);

    res.status(200).json({ accessToken });
    next();
  } catch (error) {
    next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const isRegister: User = await serviceUser.getByUsername(body.username);

    if (isRegister) {
      throw new HttpException(409, 'The user exist');
    }

    const user: User = await serviceUser.signup(body);

    res.status(201).json({ user });
    next();
  } catch (error) {
    next(error);
  }
};

const usersRoutes = express.Router();

usersRoutes.get('/login', login);
usersRoutes.post('/signup', signup);

export default usersRoutes;
