import { List, OrderedMap } from 'immutable';
import { Publication } from '../models/Publication';
import { PublicationActionType, PublicationActionTypes } from '../actions/Publications';

export type Publications = OrderedMap<string, Publication>;

// reducer takodje konvertuje obicne objekte iz akcija u immutable js objekte

export default function publicationReducer(state: Publications = OrderedMap<string, Publication>(),
                                           action: PublicationActionType = {
                                               type: PublicationActionTypes.DEFAULT
                                           }): Publications {

    switch (action.type) {

        case PublicationActionTypes.PUBLICATIONS_FETCHED:
            return OrderedMap<string, Publication>(action.publications.map(pub =>
                [pub.id, new Publication({
                    ...pub,
                    authors: List(pub.authors)
                })]
            ));

        case PublicationActionTypes.PUBLICATION_FETCHED:
            return state.set(action.publication.id, new Publication({
                ...action.publication,
                authors: List(action.publication.authors)
            }));

        case PublicationActionTypes.PUBLICATION_CREATED:
            return state.concat({
                [action.publication.id]: new Publication({
                    ...action.publication,
                    authors: List(action.publication.authors)
                })
            }) as OrderedMap<string, Publication>;

        case PublicationActionTypes.PUBLICATION_UPDATED:
            return state.set(action.publication.id, new Publication({
                ...action.publication,
                authors: List(action.publication.authors)
            }));

        case PublicationActionTypes.PUBLICATION_DELETED:
            return state.delete(action.id);

        default:
            return state;
    }
}