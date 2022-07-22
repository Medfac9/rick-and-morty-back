import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import DocumentNotFound from '../exceptions/DocumentNotFound';
import { User } from './interfaces';
import repository from './models';
import HttpException from '../exceptions/HttpException';

const view = async (id: string): Promise<User[]> => {
  const user: User[] = await repository.list({ id });

  delete user[0].password;

  return user;
};

const getByUsername = async (username: string): Promise<User> => {
  const user: User[] = await repository.list({ username });

  return user[0];
};

const login = async (username: string, password: string): Promise<string> => {
  const user: User = await getByUsername(username);

  if (!user) {
    throw new DocumentNotFound();
  }

  const verify = await argon2.verify(user.password, password);

  if (verify === false) {
    throw new DocumentNotFound();
  }

  const accessToken = jwt.sign(
    { username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
  );

  return accessToken;
};

const signup = async (user: User): Promise<User> => {
  const hasPassword = await argon2.hash(user.password);
  const newUser = { ...user, password: hasPassword };

  const userId = await repository.create(newUser);

  if (userId.length === 0) {
    throw new HttpException(500, 'The user have not created');
  }

  const userNew = await view(userId[0].toString());

  return userNew[0];
};

const servies = {
  login,
  signup,
  getByUsername,
};

export default servies;
