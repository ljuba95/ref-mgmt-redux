import { ActionType, default as ActionTypes } from '../types/ActionTypes';
import { List } from 'immutable';
import { Publication } from '../models/Publication';

export type State = List<Publication>;

export default function publications(state: State = List(),
                                     action: ActionType = { type : ActionTypes.DEFAULT }): State {

    switch (action.type) {

        case ActionTypes.PUBLICATIONS_FETCHED:
            return List(action.publications);

        default:
            return state;
    }
}