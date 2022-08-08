import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { Location } from './interfaces';
import repository from './models';

const create = async (body: Location, token: string) => {
  if (!token) {
    throw new HttpException(403, 'Access denied');
  }

  const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!verify) {
    throw new HttpException(403, 'Access denied');
  }

  const localitation = await repository.create(body);

  if (!localitation) {
    throw new HttpException(500, 'The localitation have not created');
  }

  return localitation;
};

const servies = {
  create,
};

export default servies;
