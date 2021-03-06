import {GET_LEADS, ADD_LEAD, FETCHING, ERROR_GETTING_LEADS, UPDATE_LEAD, ERROR_SAVING_LEAD} from '../actions/';

const initialState = {
    leads: [],
    singleLead: [],
    fetching: false,
    firstTime: true,
    saved:false,
    error: {'type':'', 'field':''},
    registered: false,
};

export const leads_reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING:
            return {...state, fetching:action.fetching};
        case GET_LEADS:
            return {...state, leads:action.payload, fetching:action.fetching};
        case ADD_LEAD:
            return {...state, singleLead:action.payload,
                              saved:action.saved,
                              registered:action.registered
                    };
        case UPDATE_LEAD:
            return {...state, leads:action.payload};
        case ERROR_GETTING_LEADS:
            return {...state, error:action.payload};
        case ERROR_SAVING_LEAD:
            return {...state, error:{"type":action.errorType, "field":action.field} };
        default:
            return state;
    }
};
