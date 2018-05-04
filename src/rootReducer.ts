import { combineReducers } from 'redux-immutable';
import publicationReducer from './reducers/publications';
import authorReducer from './reducers/authors';

export default combineReducers({
    publications: publicationReducer,
    authors: authorReducer
});