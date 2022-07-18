/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-import-module-exports */
import db from '../db';

const create = (obj) => (
  db('location')
    .insert(obj)
);

const models = {
  create,
};

export default models;
