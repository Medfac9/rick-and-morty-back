import { Character } from './interfaces';
import db from '../db';

const list = (params = {}) => (
  db('character')
    .where(params)
    .select()
);

const update = (id: string, obj: Partial<Character>) => (
  db('character')
    .where('id', '=', id)
    .update(obj)
);

const create = (obj: Character) => (
  db('character')
    .insert(obj)
);

const del = (id: string) => (
  db('character')
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
