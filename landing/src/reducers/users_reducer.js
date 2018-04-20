import {USER, USER_INFO, SIDE_BAR} from '../actions/';

const initialStateT = {
    userName: '',
    user: [],
    token: '',
    user_info: [],
    sideBarStatus: false,
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
            return {...state,
                sideBarStatus: action.payload,
            };
        default:
            return state;
    }
};
