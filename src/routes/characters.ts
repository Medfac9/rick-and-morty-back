/* eslint-disable no-await-in-loop */
import express, { NextFunction, Request, Response } from 'express';
import { Character } from '../characters/interfaces';
import serviceCharacter from '../characters/services';
import serviceLocation from '../locations/services';
import serviceOrigin from '../origins/services';
import HttpException from '../exceptions/HttpException';

const list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const characters: Character[] = await serviceCharacter.list();

    if (!characters.length) {
      throw new HttpException(404, 'The characters don´t exist');
    } else {
      throw new HttpException(200, characters);
    }
  } catch (error) {
    next(error);
  }
};

const view = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const character: Character[] = await serviceCharacter.view(id);

    if (!character.length) {
      throw new HttpException(404, 'The characters don´t exist');
    } else {
      throw new HttpException(200, character);
    }
  } catch (error) {
    next(error);
  }
};

const importCharacter = async (req: Request, res: Response, next: NextFunction) => {
  let url = null;
  const response = [];

  do {
    try {
      const characters = await serviceCharacter.importCharacter(url);

      url = characters.info.next;

      // eslint-disable-next-line no-restricted-syntax
      for (const element of characters.results) {
        const character = {
          id: element.id,
          name: element.name,
          status: element.status,
          species: element.species,
          type: element.type,
          gender: element.gender,
          image: element.image,
          url: element.url,
          created: element.created,
        };

        const location = {
          character_id: element.id,
          name: element.location.name,
          url: element.location.url,
        };

        const origin = {
          character_id: element.id,
          name: element.origin.name,
          url: element.origin.url,
        };

        try {
          const characterImported = await serviceCharacter.create(character);
          const locationsImported = await serviceLocation.create(location);
          const originsImported = await serviceOrigin.create(origin);

          const imported = {
            characters: characterImported,
            locations: locationsImported,
            origins: originsImported,
          };

          response.push(imported);
        } catch (error) {
          next(error);
        }
      }
    } catch (error) {
      next(error);
    }
  } while (url);

  try {
    throw new HttpException(201, response);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const character: Character[] = await serviceCharacter.create(body);

    if (!character.length) {
      throw new HttpException(500, 'The character have not created');
    } else {
      throw new HttpException(201, character);
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const character: number = await serviceCharacter.update(id, body);

    if (character !== 1) {
      throw new HttpException(404, 'The character don´t exist');
    } else {
      throw new HttpException(200, 'The character updated');
    }
  } catch (error) {
    next(error);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const character: number = await serviceCharacter.del(id);

    if (character !== 1) {
      throw new HttpException(404, 'The character don´t exist');
    } else {
      throw new HttpException(200, 'The character deleted');
    }
  } catch (error) {
    next(error);
  }
};

const charactersRoutes = express.Router();

charactersRoutes.get('/', list);
charactersRoutes.post('/', create);
charactersRoutes.get('/:id', view);
charactersRoutes.put('/:id', update);
charactersRoutes.delete('/:id', del);
charactersRoutes.post('/import', importCharacter);

export default charactersRoutes;
