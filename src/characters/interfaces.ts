/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Origin } from '../origins/interfaces';
import { Location } from '../locations/interfaces';

export interface Character {
    id: number
    name: string
    status: 'alive' | 'dead' | 'unknown'
    species: string
    type?: string
    gender: 'male' | 'female' | 'genderless' | 'unknown'
    image?: URL
    created: Date | null
}

export interface Info {
    count: number
    pages: number
    next?: string
    prev?: string
}

export interface Result {
    id: number
    name: string
    status: 'alive' | 'dead' | 'unknown'
    species: string
    type?: string
    gender: 'male' | 'female' | 'genderless' | 'unknown'
    origin: Origin
    location: Location
    image?: URL
    episode: []
    url: URL
    created: Date | null
}

export interface DataImported {
    info: Info
    results: Result[]
}

export interface ID {
    id: string
}
