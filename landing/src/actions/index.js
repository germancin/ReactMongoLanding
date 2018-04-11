import axios from 'axios';
const faker = require('faker');

export const ADD_LEAD = 'ADD_LEAD';
export const FETCHING = 'FETCHING';
export const ERROR_GETTING_LEADS = 'ERROR_GETTING_LEADS';
export const UPDATE_LEAD = 'UPDATE_LEAD';
export const SEARCH = 'SEARCH';
export const GET_LEADS = 'GET_LEADS';
export const USER = 'USER';
export const USER_INFO = 'USER_INFO';



export const logOut = () => {
    const resp = axios.get(`http://localhost:3040/api/user/log_out`, {withCredentials: true});

    return dispatch => {
        resp.then(({data}) => {
            window.location = "/";
            // dispatch({});
        })
        .catch((err) => {
            console.log('err',err);

        });
    };
};

export const setUserInfo = (userInfo) => {
    console.log('setUserInfo:userInfo :::', userInfo);

    return dispatch => {
        dispatch({type: USER_INFO, payload:userInfo});
    };
};

export const extendTokenLife = () => {
    const resp = axios.get(`http://localhost:3040/api/user/extend_token_life`, {withCredentials: true});

    return dispatch => {
        resp.then(({data}) => {
            console.log('data extendTokenLife:::', data);
            sessionStorage.setItem('user', JSON.stringify(data));
            window.location = "/";
            // dispatch({});
        })
            .catch((err) => {
                console.log('err',err);
                window.location = "/sign_in";
            });
    };
};

export const getLeads = () => {
    const leads = axios.get('http://localhost:3040/api/lead');

    return dispatch => {
        dispatch({type: FETCHING, fetching: true});
        leads
            .then(response => {
                console.log('response:::', response.data);

                // responseData.reverse();
                dispatch({type: GET_LEADS, payload: response.data, first_time:false});
                // dispatch({type: FETCHING, fetching: false});
            })
            .catch(err => {
                dispatch({type: ERROR_GETTING_LEADS, payload: err});
            });
    };
};

export const signUpUser = (user) => {
    const newUser = axios.post('http://localhost:3040/api/user', {
        name:user.name,
        email:user.email,
        password:user.password,
    },
    {withCredentials: true});

    return dispatch => {
        newUser
            .then(({data}) => {
                sessionStorage.setItem('user_signed_up', JSON.stringify(data.user));
                dispatch({type: USER, user_name:data.user.name, payload:data.user, token:data.token});
                // TODO: should redirect to the sig in page with success message
                // window.location = "/sign_in";
            })
            .catch(err => {
                dispatch({type: ERROR_GETTING_LEADS, payload: err});
            });
    };
};

export const signInUser = (user) => {

    const userR = axios.post('http://localhost:3040/api/user/sign_in', {
        email:user.email,
        password:user.password,
    }, {withCredentials: true});

    return dispatch => {
        userR.then(({data}) => {
                console.log('data::: ', JSON.stringify(data.user))
                sessionStorage.setItem('user', JSON.stringify(data.user));
                dispatch({type: USER_INFO, payload:data, user_name:data.user.name});


            })
            .catch(err => {
                dispatch({type: ERROR_GETTING_LEADS, payload: err});
            });
    };
};

export const addLead = (lead) => {
    const newLead = axios.post('http://localhost:3040/api/lead', {
        name:lead.title,
        email:lead.description,
        phone:lead.tags,
    },{withCredentials: true});

    return dispatch => {
        newLead
            .then(({data}) => {
                dispatch({type: ADD_LEAD, payload: data});
                window.location = "/";
            })
            .catch((error) => {
                console.log(error.error);
            });
    };
};

export const deleteLead = (leadkey) => {
    const key = leadkey;

    console.log('ready to delete key ', leadkey);
    const newNotes = axios.delete(`http://localhost:3040/api/note/${key}`, {
        key: key,
    });
    return dispatch => {
        newNotes
            .then(() => {
                window.location = "/";
            })
            .catch(err => {
                dispatch({type: ERROR_GETTING_LEADS, payload: err});
            });
    };
};

export const updateLead = (noteObj) => {

    const key = noteObj.key;
    const newNotes = axios.put(`http://localhost:3030/api/lead/${key}`, {
        key:key,
        noteObj,
    });
    return dispatch => {
        newNotes
            .then(({data}) => {
                dispatch({type: UPDATE_LEAD, payload: data});
                window.location = "/";
            })
            .catch(err => {
                dispatch({type: ERROR_GETTING_LEADS, payload: err});
            });
    };
};

export const syncLocalStore = (response) => {

    return dispatch => {

        dispatch({type: FETCHING, fetching: true});

        const respKeys = Object.keys(response);
        const responseData = Object.entries(response).map((note, i) => {
            note[1].key = respKeys[i];
            return note[1];
        });

        responseData.reverse();
        dispatch({type: GET_LEADS, payload: responseData, first_time:false});
        dispatch({type: FETCHING, fetching: false});

    };
};

// export const search = (criteria, status) => {
//
//     // Handle when user deletes input and gets to 0
//     if(criteria.length === 0){
//         return dispatch => {
//             dispatch({type: SEARCH, payload: [], search:status });
//         };
//     }
//
//     const searchResponse = axios.post(`http://localhost:3333/notes/search/${criteria}`, {
//         criteria:criteria,
//     });
//
//     return dispatch => {
//         dispatch({type: RETRIEVING_SEARCH, retrieving_search:true });
//         searchResponse
//             .then(({data: response}) => {
//
//                 // Handle when the search found nothing.
//                 if(response === null){
//                     dispatch({type: SEARCH, payload: [], search:status });
//                     dispatch({type: RETRIEVING_SEARCH, retrieving_search:false });
//                 }else{
//
//                     const respKeys = Object.keys(response);
//                     const responseData = Object.entries(response).map((note, i) => {
//                         note[1].key = respKeys[i];
//                         return note[1];
//                     });
//
//                     dispatch({type: SEARCH, payload: responseData, search:status, retrievingSearch:false });
//                 }
//
//             })
//             .catch(err => {
//                 // dispatch({type: SEARCH,  search:true });
//                 dispatch({type: ERROR_GETTING_LEADS, payload: err});
//             });
//     };
//
// };



