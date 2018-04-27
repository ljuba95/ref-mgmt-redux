import ActionTypes from '../types/ActionTypes';
import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import StateType from '../types/StateType';
import { Publication } from '../models/Publication';
import { addPublication as createPublication, fetchPublications } from '../backend/fakeApi';
import { List } from 'immutable';

export const action: ActionCreator<Action> = () => {
    return {
        type: ActionTypes.DEFAULT,
    };
};

export const asyncThunkAction: ActionCreator<
    ThunkAction<Promise<Action>, StateType, void>
    > = () => {
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

export const publicationsFetched: ActionCreator<Action> = (publications: List<Publication>) => {
    return {
        type: ActionTypes.PUBLICATIONS_FETCHED,
        publications
    };
};

export const addPublication: ActionCreator<
    ThunkAction<Promise<Publication>, StateType, void>
    > = (publication: Publication) => (dispatch: Dispatch<StateType>) => new Promise<Publication>((resolve, reject) => {
            createPublication(publication).then(value => resolve(value));
        });

export const getPublications: ActionCreator<ThunkAction<void, StateType, void>> = () => {
    return (dispatch: Dispatch<StateType>) => {
       return fetchPublications().then(data => {
            dispatch(publicationsFetched(List<Publication>(data)));
        });
    };
};
