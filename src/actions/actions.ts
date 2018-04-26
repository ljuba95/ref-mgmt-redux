import ActionTypes from '../types/ActionTypes';
import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import StateType from '../types/StateType';

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
