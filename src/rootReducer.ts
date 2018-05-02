import { combineReducers } from 'redux-immutable';
import publicationReducer from './reducers/publications';

// todo: treba da provalimo sta tacno vraca ovaj redux-immutable combineReducers da mozemo da napravimo statetype

export default combineReducers({
    publications: publicationReducer
});