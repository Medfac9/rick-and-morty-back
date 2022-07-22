import { User } from './interfaces';
import db from '../db';

const dataBase = 'user';

const list = (params = {}) => (
  db(dataBase)
    .where(params)
    .select()
);

const update = (id: string, obj: Partial<User>) => (
  db(dataBase)
    .where('id', '=', id)
    .update(obj)
);

const create = (obj: User) => (
  db(dataBase)
    .insert(obj)
);

const del = (id: string) => (
  db(dataBase)
    .where('id', '=', id)
    .del()
);

const models = {
  list,
  update,
  create,
  del,
};

export default models;
