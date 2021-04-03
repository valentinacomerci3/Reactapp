import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//call to fetch that returns result//
//converts JSON to javascript, array for campsites//
export const fetchCampsites = () => dispatch => {
    dispatch(campsitesLoading());
//give fetch a URL (base URL for json server + campsite(location for the resource we want))//
    return fetch(baseUrl + 'campsites')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message);
            throw errMess;
        }
    )    
        .then(response => response.json()) //chain then method, returns a promise, uses json method to convert response from json to javascript//
        .then(campsites => dispatch(addCampsites(campsites))) //chain another then method here, take javascript array from this campsite's argument once previous promise resolves. Then, dispatch that campsite's argument with addCampsites action creator to be used as its payload//
        .catch(error => dispatch(campsitesFailed(error.message)));

};

//one arrow, standard action creator, no payload, just type. not thunk, goes straight to reducer as normal//
export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});
//action for campsitesFailed, passing error message as payload.//
export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});
//addCampsites action, campsites parameter, normal action creator, returns object, not another function, so not using Thunk. Has campsites argument that was passed in which should be an array as the payload//
export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

//action creator: fetch call for comments. should return promise for array of comments objects. if fetch was successful, use json method to convert to JS array. Then, dispatch addComments to add comments to Redux store//
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};
//one arrow function. comments failed action creator. parameter of errMess, creates object with type of actiontypes.comments_failed, with payload containing error message.//
export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});
//one arrow function. add comments action creator. parameter of comments, creates object with type of actiontypes.add_comments, with payload containing argument passed in as comments//
export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
//using thunk middleware so it can handle async calls inside it//
export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date ().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log('post comment', error.message);
        alert('Your comment could not be posted\nError: ' + error.message);
    });
};

//thunked action creator for promotions. 
export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

//one arrow function. promotions loading action creator//
export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});
//one arrow function. promotions failed action creator//

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});
//one arrow function. partners loading action creator//
export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

//partners thunked action creator//
export const fetchPartners = () => dispatch => {
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

//one arrow function. partners  loading action creator//
export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});
//one arrow function. partners  failed action creator//

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});
//one arrow function. partners loading action creator//
export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

//Task 2: Action Creator postFeedback//
export const postFeedback = feedback => () => {
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; })
        .then(response => response.json())
        .then(response => { 
            console.log('Feedback: ', response); 
            alert('Thank you for your feedback!\n' + JSON.stringify(response));
        })
        .catch(error => { 
            console.log('Feedback: ', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};