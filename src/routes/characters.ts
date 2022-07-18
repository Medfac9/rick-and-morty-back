/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { Character } from 'characters/interfaces';
import express, { Request, Response } from 'express';
import serviceCharacter from '../characters/services';
import serviceLocation from '../locations/services';
import serviceOrigin from '../origins/services';

const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const characters: Character[] = await serviceCharacter.list();

    if (!characters.length) {
      res.status(404).json({ error: 'The characters don´t exist' });
    } else {
      res.json(characters);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const view = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character: Character[] = await serviceCharacter.view(id);

    if (!character.length) {
      res.status(404).json({ error: 'The character doesn´t exist' });
    } else {
      res.json(character);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const importCharacter = async (req: Request, res: Response) => {
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
          res.status(500).json({ error });
        }
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } while (url);

  res.status(201).json(response);
};

const create = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const character: number[] = await serviceCharacter.create(body);

    if (!character.length) {
      res.status(500).json({ error: 'The character have not created' });
    } else {
      res.status(201).json(character);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const character: number = await serviceCharacter.update(id, body);

    if (character !== 1) {
      res.status(404).json({ error: 'The characters don´t exist' });
    } else {
      res.json(character);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character: number = await serviceCharacter.del(id);

    if (character !== 1) {
      res.status(404).json({ error: 'The characters don´t exist' });
    } else {
      res.json(character);
    }
  } catch (error) {
    res.status(500).json({ error });
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
