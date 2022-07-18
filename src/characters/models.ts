/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Character, ID } from './interfaces';
import db from '../db';

const list = (params = {}) => (
  db('character')
    .where(params)
    .select()
);

const update = (id: ID, obj: Character) => (
  db('character')
    .where(id)
    .update(obj)
);

const create = (obj: Character) => (
  db('character')
    .insert(obj)
);

const del = (id: ID) => (
  db('character')
    .where(id)
    .del()
);

const models = {
  list,
  update,
  create,
  del,
};

export default models;
