import { OrderedMap } from 'immutable';
import { Publication, PublicationParams } from '../models/Publication';
import { PublicationActionType, PublicationActionTypes } from '../actions/Publications';

export type Publications = OrderedMap<string, Publication>;

export default function publicationReducer(state: Publications = OrderedMap<string, Publication>(),
                                           action: PublicationActionType = {
                                               type: PublicationActionTypes.DEFAULT
                                           }): Publications {

    switch (action.type) {

        case PublicationActionTypes.PUBLICATIONS_FETCHED:
            return OrderedMap<string, Publication>(action.publications.map((pub: PublicationParams) =>
                [pub.id, new Publication(pub)]
            ));

        case PublicationActionTypes.PUBLICATION_FETCHED:
            return state.set(action.publication.id, new Publication(action.publication));
        // const index = state.findIndex((pub: Publication) => pub.id === action.publication.id);
        // if (index >= 0) {
        //     return state.map((pub: Publication) => {
        //         return pub.id === action.publication.id ? action.publication : pub;
        //     }) as List<Publication>;
        // } else {
        //     return state.push(action.publication);
        // }

        case PublicationActionTypes.PUBLICATION_CREATED:
            return state.concat({
                [action.publication.id]: new Publication(action.publication)
            }) as OrderedMap<string, Publication>;

        case PublicationActionTypes.PUBLICATION_UPDATED:
            return state.set(action.publication.id, new Publication(action.publication));
        // return state.map((pub: Publication) => {
        //    return pub.id === action.publication.id ? action.publication : pub;
        // }) as List<Publication>;

        case PublicationActionTypes.PUBLICATION_DELETED:
            return state.delete(action.id);
        // return state.filter((pub: Publication) => pub.id !== action.id) as List<Publication>;

        default:
            return state;
    }
}