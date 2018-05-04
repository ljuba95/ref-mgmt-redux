import { Map } from 'immutable';
import { Author } from '../models/Author';
import { AuthorActionType, AuthorActionTypes } from '../actions/Authors';

export type Authors = Map<string, Author>;

export default function authorReducer(state: Authors = Map<string, Author>(),
                                      action: AuthorActionType = {type: AuthorActionTypes.DEFAULT}): Authors {

    switch (action.type) {

        default:
            return state;
    }
}