import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Publication } from '../models/Publication';
import {
    addPublication as createPublication, deletePublication as deletePub,
    fetchPublicationById, updatePublication as updatePub,
    fetchPublications,
} from '../backend/fakeApi';
import { List } from 'immutable';

export enum ActionTypes {
    DEFAULT = 'DEFAULT',
    PUBLICATIONS_FETCHED = 'PUBLICATIONS_FETCHED',
    PUBLICATION_FETCHED = 'PUBLICATION_FETCHED',
    PUBLICATION_CREATED = 'PUBLICATION_CREATED',
    PUBLICATION_UPDATED = 'PUBLICATION_UPDATED',
    PUBLICATION_DELETED = 'PUBLICATION_DELETED',

}

// Treba da se dogovorimo oko izgleda akcije, moze da bude {type: ActionTypes, payload: any}

export interface ActionType {
    type: ActionTypes;
    [propName: string]: any;
}

export const action: ActionCreator<Action> = () => {
    return {
        type: ActionTypes.DEFAULT,
    };
};

export const asyncThunkAction: ActionCreator<ThunkAction<Promise<Action>, void, void>> = () => {
    return (dispatch: Dispatch<void>) => {
        return new Promise((resolve, reject) => {
            // ...
            return dispatch({
                type: ActionTypes.DEFAULT
            });
        });
    };
};

export const thunkAction: ActionCreator<ThunkAction<Action, void, void>> = () => {
    return (dispatch: Dispatch<void>): Action => {
        return dispatch({
            type: ActionTypes.DEFAULT
        });
    };
};

export const publicationsFetched: ActionCreator<Action> = (publications: List<Publication>) => ({
    type: ActionTypes.PUBLICATIONS_FETCHED,
    publications
});

export const publicationFetched: ActionCreator<Action> = (publication: Publication) => ({
    type: ActionTypes.PUBLICATION_FETCHED,
    publication
});

export const publicationCreated = (publication: Publication) => ({
    type: ActionTypes.PUBLICATION_CREATED,
    publication
});

export const publicationUpdated = (publication: Publication) => ({
    type: ActionTypes.PUBLICATION_UPDATED,
    publication
});

export const publicationDeleted = (id: string) => ({
    type: ActionTypes.PUBLICATION_DELETED,
    id
});

/**
 *
 * @param {Publication} publication ne mora da ima id, generise se na strani api-a
 * @returns {(dispatch: Dispatch<ReduxStateType>) => Promise<Publication>}
 * resolvuje se u sacuvanu publikaciju sa generisanim id
 */
export const savePublication: ActionCreator<ThunkAction<Promise<Publication>, void, void>> =
    (publication: Publication) => (dispatch: Dispatch<void>) => {
        return createPublication(publication).then((pub: Publication) => {
            dispatch(publicationCreated(pub));
            return pub;
        });
    };

export const getPublications: ActionCreator<ThunkAction<Promise<any>, void, void>> = () => {
    return (dispatch: Dispatch<void>) => {
        return fetchPublications().then(data => {
            dispatch(publicationsFetched(List<Publication>(data)));
        });
    };
};

export const getPublication: ActionCreator<ThunkAction<Promise<any>, void, void>> = (id: string) => {
    return (dispatch: Dispatch<void>) => {
        return fetchPublicationById(id).then((publication: Publication) => {
            dispatch(publicationFetched(publication));
        });
    };
};

export const updatePublication: ActionCreator<ThunkAction<Promise<any>, void, void>> = (pub: Publication) => {
    return (dispatch: Dispatch<void>) => {
        return updatePub(pub).then((data: Publication) => {
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
