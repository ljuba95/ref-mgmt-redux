import { Record } from 'immutable';

export interface AuthorParams {
    id: string;
    name: string;
    familyName: string;
}

let defaultParams: AuthorParams = {id: '', name: '', familyName: ''};

export class Author extends Record(defaultParams) {

    constructor(params: AuthorParams) {
        super(params);
    }

    get<T extends keyof AuthorParams>(value: T): AuthorParams[T] {
        return super.get(value);
    }

    set<T extends keyof AuthorParams>(id: T, value: any): Author {
        return super.set(id, value) as Author;
    }

}