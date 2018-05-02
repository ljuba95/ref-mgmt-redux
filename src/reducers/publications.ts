import { OrderedMap } from 'immutable';
import { Publication } from '../models/Publication';
import { ActionType, ActionTypes } from '../actions/Publications';

export type Publications = OrderedMap<string, Publication>;

export default function publicationReducer(state: Publications = OrderedMap<string, Publication>(),
                                           action: ActionType = { type : ActionTypes.DEFAULT }): Publications {

    switch (action.type) {

        case ActionTypes.PUBLICATIONS_FETCHED:
            return OrderedMap<string, Publication>(action.publications.map((pub: Publication) => [pub.id, pub]));

        case ActionTypes.PUBLICATION_FETCHED:
            return state.set(action.publication.id, action.publication);
            // const index = state.findIndex((pub: Publication) => pub.id === action.publication.id);
            // if (index >= 0) {
            //     return state.map((pub: Publication) => {
            //         return pub.id === action.publication.id ? action.publication : pub;
            //     }) as List<Publication>;
            // } else {
            //     return state.push(action.publication);
            // }

        case ActionTypes.PUBLICATION_CREATED:
            return state.concat({[action.publication.id]: action.publication}) as OrderedMap<string, Publication>;

        case ActionTypes.PUBLICATION_UPDATED:
            return state.set(action.publication.id, action.publication);
            // return state.map((pub: Publication) => {
            //    return pub.id === action.publication.id ? action.publication : pub;
            // }) as List<Publication>;

        case ActionTypes.PUBLICATION_DELETED:
            return state.delete(action.id);
            // return state.filter((pub: Publication) => pub.id !== action.id) as List<Publication>;

        default:
            return state;
    }
}