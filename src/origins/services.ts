import { Origin } from './interfaces';
import repository from './models';

const create = async (body: Origin) => {
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
