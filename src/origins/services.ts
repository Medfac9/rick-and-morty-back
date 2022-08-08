import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { Origin } from './interfaces';
import repository from './models';

const create = async (body: Origin, token: string) => {
  if (!token) {
    throw new HttpException(403, 'Access denied');
  }

  const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!verify) {
    throw new HttpException(403, 'Access denied');
  }

  const origin = await repository.create(body);

  if (!origin) {
    throw new HttpException(500, 'The origin have not created');
  }

  return origin;
};

const servies = {
  create,
};

export default servies;
