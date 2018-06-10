import { combineReducers } from 'redux';
import { leads_reducer } from './leads_reducer';
import { users_reducer } from './users_reducer';

export default combineReducers({
    users_reducer,
    leads_reducer
});
