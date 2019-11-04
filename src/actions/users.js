import * as types from '../constants/actionTypes';

export const addUser = (data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.USER_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/users`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const getUsers = (page, limit) => (dispatch, getState) => {
  const params = {
    page,
    limit
  };

  return dispatch({
    types: [types.API_REQUEST_SEND, types.USER_SET_BROWSE, types.API_REQUEST_ERROR],
    payload: {
      request: {
        url: 'api/v1/users',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getState().auth.user.token}`
        },
        params
      }
    }
  })
};

export const getUser = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.USER_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/users/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  }
});

export const editUser = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.USER_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/users/${id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const deleteUser = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.USER_DELETE_ITEM, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/users/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
});