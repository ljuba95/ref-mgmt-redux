import { OrderedMap } from 'immutable';
import { Publication } from './Publication';
import { Author } from './Author';

export default interface ReduxStateType {
    publications: OrderedMap<string, Publication>;
    authors: Map<string, Author>;
}
