import { Origin } from '../origins/interfaces';
import { Location } from '../locations/interfaces';

export interface Character {
    id: number
    name: string
    status: 'alive' | 'dead' | 'unknown'
    species: string
    type?: string
    gender: 'male' | 'female' | 'genderless' | 'unknown'
    image?: string
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
    image?: string
    episode: []
    url: string
    created: Date | null
}

export interface DataImported {
    info: Info
    results: Result[]
}
