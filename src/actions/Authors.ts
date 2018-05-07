import { fetchAuthors } from '../backend/fakeApi';
import { List } from 'immutable';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react-redux';
import { Author, AuthorParams } from '../models/Author';

export enum AuthorActionTypes {
    DEFAULT = 'DEFAULT',
    AUTHORS_FETCHED = 'AUTHORS_FETCHED'
}

export interface AuthorActionType {
    type: AuthorActionTypes;
    [propName: string]: any;
}

export const authorsFetched: ActionCreator<Action> = (authors: List<AuthorParams>) => ({
    type: AuthorActionTypes.AUTHORS_FETCHED,
    authors
});

export const getAuthors: ActionCreator<ThunkAction<Promise<any>, void, void>> = () => {
    return (dispatch: Dispatch<void>) => {
        return fetchAuthors().then(data => {
            dispatch(authorsFetched(List<Author>(data)));
        });
    };
};