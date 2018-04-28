import ActionTypes from '../types/ActionTypes';
import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import StateType from '../types/StateType';
import { Publication } from '../models/Publication';
import {
    addPublication as createPublication, deletePublication as deletePub, fetchPublicationById, fetchPublications,
    updatePublication as updatePub
} from '../backend/fakeApi';
import { List } from 'immutable';

export const action: ActionCreator<Action> = () => {
    return {
        type: ActionTypes.DEFAULT,
    };
};

export const asyncThunkAction: ActionCreator<ThunkAction<Promise<Action>, StateType, void>> = () => {
    return (dispatch: Dispatch<StateType>) => {
        return new Promise((resolve, reject) => {
            // ...
            return dispatch({
                type: ActionTypes.DEFAULT
            });
        });
    };
};

export const thunkAction: ActionCreator<ThunkAction<Action, StateType, void>> = () => {
    return (dispatch: Dispatch<StateType>): Action => {
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
 * @returns {(dispatch: Dispatch<StateType>) => Promise<Publication>}
 * resolvuje se u sacuvanu publikaciju sa generisanim id
 */
export const savePublication: ActionCreator<ThunkAction<Promise<Publication>, StateType, void>> =
    (publication: Publication) => (dispatch: Dispatch<StateType>) => {
        return createPublication(publication).then((pub: Publication) => {
            dispatch(publicationCreated(pub));
            return pub;
        });
    };

export const getPublications: ActionCreator<ThunkAction<void, StateType, void>> = () => {
    return (dispatch: Dispatch<StateType>) => {
        return fetchPublications().then(data => {
            dispatch(publicationsFetched(List<Publication>(data)));
        });
    };
};

export const getPublication: ActionCreator<ThunkAction<void, StateType, void>> = (id: string) => {
    return (dispatch: Dispatch<StateType>) => {
        return fetchPublicationById(id).then((publication: Publication) => {
            dispatch(publicationFetched(publication));
        });
    };
};

export const updatePublication: ActionCreator<ThunkAction<void, StateType, void>> = (pub: Publication) => {
    return (dispatch: Dispatch<StateType>) => {
        return updatePub(pub).then((data: Publication) => {
            dispatch(publicationUpdated(data));
        });
    };
};

export const deletePublication: ActionCreator<ThunkAction<void, StateType, void>> = (id: string) => {
    return (dispatch: Dispatch<StateType>) => {
        return deletePub(id).then((pubId: string) => {
            dispatch(publicationDeleted(pubId));
            return pubId;
        });
    };
};
