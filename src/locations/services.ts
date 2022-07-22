import { Location } from './interfaces';
import repository from './models';

const create = async (body: Location) => {
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
