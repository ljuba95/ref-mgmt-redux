import { Map } from 'immutable';
import { Author, AuthorParams } from '../models/Author';
import { AuthorActionType, AuthorActionTypes } from '../actions/Authors';

export type Authors = Map<string, Author>;

export default function authorReducer(state: Authors = Map<string, Author>(),
                                      action: AuthorActionType = {type: AuthorActionTypes.DEFAULT}): Authors {

    switch (action.type) {

        case AuthorActionTypes.AUTHORS_FETCHED:
            return Map<string, Author>(action.authors.map((author: AuthorParams) =>
                [author.id, new Author(author)]
            ));

        default:
            return state;
    }
}