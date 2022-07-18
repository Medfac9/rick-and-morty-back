/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-import-module-exports */
import { Character, DataImported } from 'characters/interfaces';
import axios from 'axios';
import repository from './models';

const importCharacter = async (url: string = null): Promise<DataImported> => {
  let newUrl = url;

  if (!newUrl) {
    newUrl = 'https://rickandmortyapi.com/api/character/';
  }

  const response = await axios.get(newUrl);

  return response.data;
};

const list = async (): Promise<Character[]> => {
  const characters: Character[] = await repository.list();

  return characters;
};

const view = async (id: string): Promise<Character[]> => {
  const character: Character[] = await repository.list({ id });

  return character;
};

const create = async (character: Character): Promise<number[]> => {
  try {
    const characterNew = await repository.create(character);

    return characterNew;
  } catch (error) {
    return error;
  }
};

const update = async (id: string, character: Character): Promise<number> => {
  try {
    const characterUpdated = await repository.update({ id }, character);

    return characterUpdated;
  } catch (error) {
    return error;
  }
};

const del = async (id: string): Promise<number> => {
  try {
    const character = await repository.del({ id });

    return character;
  } catch (error) {
    return error;
  }
};

const servies = {
  importCharacter,
  list,
  view,
  update,
  create,
  del,
};

export default servies;
