import * as types from '../constants/actionTypes';

export const addRating = (data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.RATING_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/ratings`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const getRatings = (page, limit) => (dispatch, getState) => {
  const params = {
    page,
    limit
  };

  return dispatch({
    types: [types.API_REQUEST_SEND, types.RATING_SET_BROWSE, types.API_REQUEST_ERROR],
    payload: {
      request: {
        url: 'api/v1/ratings?include=salon',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getState().auth.user.token}`
        },
        params
      }
    }
  })
};

export const getRating = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.RATING_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/ratings/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  }
});

export const editRating = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.RATING_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/salons/${id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const deleteRating = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.RATING_DELETE_ITEM, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/ratings/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
});