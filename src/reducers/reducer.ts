import { ActionType, default as ActionTypes } from '../types/ActionTypes';

export type State = Object[];

export default function reducer(state: State = [], action: ActionType = { type : ActionTypes.DEFAULT }): State {

    switch (action.type) {

        case ActionTypes.DEFAULT:
            return state;
        default:
            return state;
    }
}