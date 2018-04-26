import { List } from 'immutable';
import { Publication } from '../models/Publication';

export default interface StateType {
    readonly publications: List<Publication>;
}