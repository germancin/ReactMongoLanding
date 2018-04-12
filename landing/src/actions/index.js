import axios from 'axios';

export const ADD_LEAD = 'ADD_LEAD';
export const FETCHING = 'FETCHING';
export const ERROR_GETTING_LEADS = 'ERROR_GETTING_LEADS';
export const UPDATE_LEAD = 'UPDATE_LEAD';
export const SEARCH = 'SEARCH';
export const GET_LEADS = 'GET_LEADS';
export const USER = 'USER';
export const USER_INFO = 'USER_INFO';
export const ERROR_SAVING_LEAD = 'ERROR_SAVING_LEAD';

const uri = 'http://208.68.36.212:3040';
// const uri = 'http://localhost:3040';

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

    const leads = axios.get(`${uri}/api/lead`);

    return dispatch => {
        dispatch({type: FETCHING, fetching: true});
        leads
            .then(response => {

                dispatch({type: GET_LEADS, payload: response.data.reverse(), first_time:false});

                setTimeout(function(){
                    dispatch({type: FETCHING, fetching: false});
                }, 3000);


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
    const newLead = axios.post(`${uri}/api/lead`, {
        name:lead.name,
        email:lead.email,
        phone:lead.phone,
    },{withCredentials: false});

    return dispatch => {
        newLead
            .then(({data}) => {

                setTimeout(function(){
                    dispatch({type: ADD_LEAD, payload:[],  saved:false});
                }, 1500);

                dispatch({type: ADD_LEAD, payload: data, saved:true});
            })
            .catch((error) => {

                if(error.response.data.type === 'duplicate') {
                    let field = '';
                    const errorMsg = error.response.data.error.errmsg;

                    if (errorMsg.includes("email")) {
                        field = 'email';
                    }
                    else if (errorMsg.includes("phone")) {
                        field = 'phone';
                    }

                    setTimeout(function(){
                        dispatch({type: ERROR_SAVING_LEAD, errorType:'', field:''});
                    }, 1800);

                    dispatch({type: ERROR_SAVING_LEAD, errorType:'duplicate', field:field});

                }

            });
    };
};

export const deleteLeads = (leadId) => {
    
    const leadDelete = axios.post(`${uri}/api/lead/delete`, leadId);

    return dispatch => {
        leadDelete
            .then(({data}) => {
                // dispatch({type: UPDATE_LEAD, payload: data});
            })
            .catch(err => {
                dispatch({type: ERROR_GETTING_LEADS, payload: err});
            });

    };
};

export const updateLead = (leadObj) => {

    const newNotes = axios.put(`${uri}/api/lead`, leadObj);

    return dispatch => {
        newNotes
            .then(({data}) => {
                // dispatch({type: UPDATE_LEAD, payload: data});
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




