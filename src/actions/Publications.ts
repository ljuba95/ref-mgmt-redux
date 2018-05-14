import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Publication } from '../models/Publication';
import {
    addPublication as createPublication, deletePublication as deletePub,
    fetchPublicationById, updatePublication as updatePub,
    fetchPublications, PublicationParams as PublicationDTO
} from '../backend/fakeApi';

export enum PublicationActionTypes {
    DEFAULT = 'DEFAULT',
    PUBLICATIONS_FETCHED = 'PUBLICATIONS_FETCHED',
    PUBLICATION_FETCHED = 'PUBLICATION_FETCHED',
    PUBLICATION_CREATED = 'PUBLICATION_CREATED',
    PUBLICATION_UPDATED = 'PUBLICATION_UPDATED',
    PUBLICATION_DELETED = 'PUBLICATION_DELETED',

}

// Treba da se dogovorimo oko izgleda akcije, moze da bude {type: ActionTypes, payload: any}

export interface PublicationActionType {
    type: PublicationActionTypes;

    [propName: string]: any;
}

export const action: ActionCreator<Action> = () => {
    return {
        type: PublicationActionTypes.DEFAULT,
    };
};

export const asyncThunkAction: ActionCreator<ThunkAction<Promise<Action>, void, void>> = () => {
    return (dispatch: Dispatch<void>) => {
        return new Promise((resolve, reject) => {
            // ...
            return dispatch({
                type: PublicationActionTypes.DEFAULT
            });
        });
    };
};

export const thunkAction: ActionCreator<ThunkAction<Action, void, void>> = () => {
    return (dispatch: Dispatch<void>): Action => {
        return dispatch({
            type: PublicationActionTypes.DEFAULT
        });
    };
};

export const publicationsFetched: ActionCreator<Action> = (publications: PublicationDTO[]) => ({
    type: PublicationActionTypes.PUBLICATIONS_FETCHED,
    publications
});

export const publicationFetched: ActionCreator<Action> = (publication: PublicationDTO) => ({
    type: PublicationActionTypes.PUBLICATION_FETCHED,
    publication
});

export const publicationCreated = (publication: PublicationDTO) => ({
    type: PublicationActionTypes.PUBLICATION_CREATED,
    publication
});

export const publicationUpdated = (publication: PublicationDTO) => ({
    type: PublicationActionTypes.PUBLICATION_UPDATED,
    publication
});

export const publicationDeleted = (id: string) => ({
    type: PublicationActionTypes.PUBLICATION_DELETED,
    id
});

/**
 *
 * @param {Publication} publication ne mora da ima id, generise se na strani api-a
 * @returns {(dispatch: Dispatch<ReduxStateType>) => Promise<Publication>}
 * resolvuje se u sacuvanu publikaciju sa generisanim id
 */
export const savePublication: ActionCreator<ThunkAction<Promise<PublicationDTO>, void, void>> =
    (publication: Publication) => (dispatch: Dispatch<void>) => {
        return createPublication({
            id: publication.get('id'),
            url: publication.get('url'),
            title: publication.get('title'),
            pages: publication.get('pages'),
            year: publication.get('year'),
            authors: publication.get('authors').toArray()
        }).then((pub: PublicationDTO) => {
            dispatch(publicationCreated(pub));
            return pub;
        });
    };

export const getPublications: ActionCreator<ThunkAction<Promise<any>, void, void>> = () => {
    return (dispatch: Dispatch<void>) => {
        return fetchPublications().then((data: PublicationDTO[]) => {
            dispatch(publicationsFetched(data));
        });
    };
};

export const getPublication: ActionCreator<ThunkAction<Promise<any>, void, void>> = (id: string) => {
    return (dispatch: Dispatch<void>) => {
        return fetchPublicationById(id).then((publication: PublicationDTO) => {
            dispatch(publicationFetched(publication));
        });
    };
};

export const updatePublication: ActionCreator<ThunkAction<Promise<any>, void, void>> = (publication: Publication) => {
    return (dispatch: Dispatch<void>) => {
        return updatePub({
            id: publication.get('id'),
            url: publication.get('url'),
            title: publication.get('title'),
            pages: publication.get('pages'),
            year: publication.get('year'),
            authors: publication.get('authors').toArray()
        }).then((data: PublicationDTO) => {
            dispatch(publicationUpdated(data));
        });
    };
};

export const deletePublication: ActionCreator<ThunkAction<Promise<any>, void, void>> = (id: string) => {
    return (dispatch: Dispatch<void>) => {
        return deletePub(id).then((pubId: string) => {
            dispatch(publicationDeleted(pubId));
            return pubId;
        });
    };
};
