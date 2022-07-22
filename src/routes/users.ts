import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { User } from '../users/interfaces';
import serviceUser from '../users/services';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user: User[] = await serviceUser.login(username, password);

    if (!user.length) {
      throw new HttpException(404, 'Username or password incorrect');
    } else {
      const accessToken = jwt.sign(
        { username: user[0].username, role: user[0].role },
        process.env.ACCESS_TOKEN_SECRET,
      );

      throw new HttpException(200, { accessToken });
    }
  } catch (error) {
    next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const isRegister: User[] = await serviceUser.getByUsername(body.username);

    if (isRegister.length) {
      throw new HttpException(409, 'The user exist');
    }

    const user: User[] = await serviceUser.signup(body);

    if (!user.length) {
      throw new HttpException(500, 'The user have not created');
    } else {
      throw new HttpException(201, user);
    }
  } catch (error) {
    next(error);
  }
};

const usersRoutes = express.Router();

usersRoutes.get('/login', login);
usersRoutes.post('/signup', signup);

export default usersRoutes;
