import { User } from './interfaces';
import repository from './models';

const login = async (username: string, password: string): Promise<User[]> => {
  const user: User[] = await repository.list({ username, password });

  return user;
};

const view = async (id: string): Promise<User[]> => {
  const user: User[] = await repository.list({ id });

  return user;
};

const getByUsername = async (username: string): Promise<User[]> => {
  const user: User[] = await repository.list({ username });

  return user;
};

const signup = async (user: User): Promise<User[]> => {
  try {
    const userId = await repository.create(user);

    const userNew = view(userId[0].toString());
    return userNew;
  } catch (error) {
    return error;
  }
};

const servies = {
  login,
  signup,
  getByUsername,
};

export default servies;
