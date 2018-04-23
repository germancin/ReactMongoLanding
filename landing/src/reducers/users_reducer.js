import {USER, USER_INFO, SIDE_BAR, USER_AUTH} from '../actions/';

const initialStateT = {
    userName: '',
    user: [],
    token: '',
    user_info: [],
    sideBarStatus: false,
    user_auth: false,
    signin_error: '',
};

export const users_reducer = (state = initialStateT, action) => {
    switch (action.type) {
        case USER:
            return {...state,
                        userName: action.user_name,
                        user: action.payload,
                        token: action.token,
                    };
        case USER_INFO:
            return {...state,
                        user_info: action.payload,
                        user: action.payload,
                        userName: action.user_name,
                    };
        case SIDE_BAR:
            return {...state, sideBarStatus: action.payload};
        case USER_AUTH:
            return {...state, user_auth: action.user_auth, signin_error:action.signin_error};
        default:
            return state;
    }
};
