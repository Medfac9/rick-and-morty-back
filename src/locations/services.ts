/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import repository from './models';

const create = async (body) => {
  try {
    const localitation = await repository.create(body);

    return localitation;
  } catch (error) {
    return error;
  }
};

const servies = {
  create,
};

export default servies;
