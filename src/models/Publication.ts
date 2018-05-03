import { Record } from 'immutable';

export interface PublicationParams {
    id: string;
    title: string;
    url: string;
    pages: number;
    year: number;
}

let defaultParams: PublicationParams = { id: '', title: '', url: '', pages: 0, year: 0 };

export class Publication extends Record(defaultParams) {

    constructor(params: PublicationParams) {
        super(params);

    }

    get<T extends keyof PublicationParams>(value: T): PublicationParams[T] {
        return super.get(value);
    }

    set<T extends keyof PublicationParams>(id: T, value: any): Publication {
        return super.set(id, value) as Publication;
    }

}