import * as types from '../constants/actionTypes';

export const addItem = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_ITEM_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/services/${id}/items?include=service`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const getItems = (id, page, limit) => (dispatch, getState) => {
  const params = {
    page,
    limit
  };

  return dispatch({
    types: [types.API_REQUEST_SEND, types.SERVICE_ITEM_SET_BROWSE, types.API_REQUEST_ERROR],
    payload: {
      request: {
        url: `api/v1/services/${id}/items?include=service`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getState().auth.user.token}`
        },
        params
      }
    }
  })
};

export const getItem = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_ITEM_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/items/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  }
});

export const editItem = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_ITEM_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/items/${id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const deleteItem = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_ITEM_DELETE_ITEM, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/items/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
});