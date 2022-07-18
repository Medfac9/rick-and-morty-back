import { Request } from 'express';

export interface Origin extends Request {
    id: number
    character_id: number
    name: string
    image: URL
}
