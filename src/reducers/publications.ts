import { ActionType, default as ActionTypes } from '../types/ActionTypes';
import { List } from 'immutable';
import { Publication } from '../models/Publication';

export type State = List<Publication>;

export default function publications(state: State = List(),
                                     action: ActionType = { type : ActionTypes.DEFAULT }): State {

    switch (action.type) {

        case ActionTypes.PUBLICATIONS_FETCHED:
            return List(action.publications);

        case ActionTypes.PUBLICATION_FETCHED:
            const index = state.findIndex((pub: Publication) => pub.id === action.publication.id);
            if (index >= 0) {
                return state.map((pub: Publication) => {
                    return pub.id === action.publication.id ? action.publication : pub;
                }) as List<Publication>;
            } else {
                return state.push(action.publication);
            }

        case ActionTypes.PUBLICATION_CREATED:
            return state.push(action.publication);

        case ActionTypes.PUBLICATION_UPDATED:
            return state.map((pub: Publication) => {
               return pub.id === action.publication.id ? action.publication : pub;
            }) as List<Publication>;

        case ActionTypes.PUBLICATION_DELETED:
            return state.filter((pub: Publication) => pub.id !== action.id) as List<Publication>;

        default:
            return state;
    }
}