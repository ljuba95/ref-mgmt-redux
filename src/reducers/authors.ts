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
        case AuthorActionTypes.AUTHOR_CREATED:
            return state.set(action.author.id, new Author(action.author));

        case AuthorActionTypes.AUTHOR_DELETED:
            return state.delete(action.id);

        default:
            return state;
    }
}