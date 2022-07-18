import { Request } from 'express';

export interface Location extends Request {
    id: number
    character_id: number
    name: string
    image: URL
}
