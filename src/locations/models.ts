import db from '../db';
import { Location } from './interfaces';

const create = (obj: Location) => (
  db('location')
    .insert(obj)
);

const models = {
  create,
};

export default models;
