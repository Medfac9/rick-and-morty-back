/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-import-module-exports */
import repository from './models';

const create = async (body) => {
  try {
    const origin = await repository.create(body);

    return origin;
  } catch (error) {
    return error;
  }
};

const servies = {
  create,
};

export default servies;
