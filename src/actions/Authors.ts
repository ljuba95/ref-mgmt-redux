import {
    addAuthor, deleteAuthor as deleteAut,
    fetchAuthors
} from '../backend/fakeApi';
import { List } from 'immutable';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react-redux';
import { Author, AuthorParams } from '../models/Author';

export enum AuthorActionTypes {
    DEFAULT = 'DEFAULT',
    AUTHORS_FETCHED = 'AUTHORS_FETCHED',
    AUTHOR_CREATED = 'AUTHOR_CREATED',
    AUTHOR_DELETED = 'AUTHOR_DELETED'
}

export interface AuthorActionType {
    type: AuthorActionTypes;
    [propName: string]: any;
}

export const authorsFetched: ActionCreator<Action> = (authors: List<AuthorParams>) => ({
    type: AuthorActionTypes.AUTHORS_FETCHED,
    authors
});

export const authorCreated: ActionCreator<Action> = (author: AuthorParams) => ({
    type: AuthorActionTypes.AUTHOR_CREATED,
    author
});

export const authorDeleted = (id: string) => ({
    type: AuthorActionTypes.AUTHOR_DELETED,
    id
});

export const getAuthors: ActionCreator<ThunkAction<Promise<any>, void, void>> = () => {
    return (dispatch: Dispatch<void>) => {
        return fetchAuthors().then(data => {
            dispatch(authorsFetched(List<Author>(data)));
        });
    };
};

export const saveAuthor: ActionCreator<ThunkAction<Promise<AuthorParams>, void, void>> =
    (author: Author) => (dispatch: Dispatch<void>) => {
        return addAuthor({
            id: author.get('id'),
            name: author.get('name'),
            familyName: author.get('familyName'),
            institution: author.get('institution')
        }).then((authorData: AuthorParams) => {
            dispatch(authorCreated(authorData));
            return authorData;
        });
    };

export const deleteAuthor: ActionCreator<ThunkAction<Promise<any>, void, void>> = (id: string) => {
    return (dispatch: Dispatch<void>) => {
        return deleteAut(id).then((authorId: string) => {
            dispatch(authorDeleted(authorId));
            return authorId;
        });
    };
};