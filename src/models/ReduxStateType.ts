import { OrderedMap } from 'immutable';
import { Publication } from './Publication';

export default interface ReduxStateType {
    publications: OrderedMap<string, Publication>;
}