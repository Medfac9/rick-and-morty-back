import jwt from 'jsonwebtoken';
import axios from 'axios';
import HttpException from '../exceptions/HttpException';
import DocumentNotFound from '../exceptions/DocumentNotFound';
import { Character, DataImported } from './interfaces';
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

  if (characters.length === 0) {
    throw new DocumentNotFound();
  }

  return characters;
};

const view = async (id: string): Promise<Character> => {
  const character: Character[] = await repository.list({ id });

  if (character.length === 0) {
    throw new DocumentNotFound();
  }

  return character[0];
};

const create = async (character: Character, token: string): Promise<Character> => {
  if (!token) {
    throw new HttpException(403, 'Access denied');
  }

  const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!verify) {
    throw new HttpException(403, 'Access denied');
  }

  const characterId = await repository.create(character);

  if (!character) {
    throw new HttpException(500, 'The character have not created');
  }

  const characterNew = view(characterId[0].toString());
  return characterNew;
};

const update = async (id: string, character: Character, token: string): Promise<number> => {
  if (!token) {
    throw new HttpException(403, 'Access denied');
  }

  const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!verify) {
    throw new HttpException(403, 'Access denied');
  }

  const characterUpdated = await repository.update(id, character);

  if (characterUpdated !== 1) {
    throw new DocumentNotFound();
  }

  return characterUpdated;
};

const del = async (id: string, token: string): Promise<number> => {
  if (!token) {
    throw new HttpException(403, 'Access denied');
  }

  const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!verify) {
    throw new HttpException(403, 'Access denied');
  }

  const character = await repository.del(id);

  if (character !== 1) {
    throw new DocumentNotFound();
  }

  return character;
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
