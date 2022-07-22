import db from '../db';
import { Origin } from './interfaces';

const create = (obj: Origin) => (
  db('origin')
    .insert(obj)
);

const models = {
  create,
};

export default models;
