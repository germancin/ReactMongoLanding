import {GET_LEADS, ADD_LEAD, FETCHING, ERROR_GETTING_LEADS, UPDATE_LEAD} from '../actions/';

const initialState = {
    leads: [],
    fetching: false,
    firstTime: true,
};

export const leads_reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING:
            return {...state, fetching: action.fetching};
        case GET_LEADS:
            return {...state, leads: action.payload, fetching: false};
        case ADD_LEAD:
            return {...state, notes: action.payload};
        case UPDATE_LEAD:
            return {...state, notes: action.payload};
        case ERROR_GETTING_LEADS:
            return {...state, error: action.payload};
        default:
            return state;
    }
};
