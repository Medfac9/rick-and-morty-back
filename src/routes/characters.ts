/* eslint-disable no-await-in-loop */
import express, { NextFunction, Request, Response } from 'express';
import { Character } from '../characters/interfaces';
import serviceCharacter from '../characters/services';
import serviceLocation from '../locations/services';
import serviceOrigin from '../origins/services';

const list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const characters: Character[] = await serviceCharacter.list();

    res.status(200).json({ characters });
    next();
  } catch (error) {
    next(error);
  }
};

const view = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const character: Character = await serviceCharacter.view(id);

    res.status(200).json({ character });
    next();
  } catch (error) {
    next(error);
  }
};

const importCharacter = async (req: Request, res: Response, next: NextFunction) => {
  let url = null;
  const response = [];
  const { token } = req.cookies;

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
          const characterImported = await serviceCharacter.create(character, token);
          const locationsImported = await serviceLocation.create(location, token);
          const originsImported = await serviceOrigin.create(origin, token);

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
    res.status(201).json({ response });
    next();
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    const { body } = req;

    const character: Character = await serviceCharacter.create(body, token);

    res.status(201).json({ character });
    next();
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  try {
    const { id } = req.params;
    const { body } = req;

    await serviceCharacter.update(id, body, token);

    res.status(200).json({ message: 'The character updated' });
    next();
  } catch (error) {
    next(error);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  try {
    const { id } = req.params;
    await serviceCharacter.del(id, token);

    res.status(200).json({ message: 'The character deleted' });
    next();
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
