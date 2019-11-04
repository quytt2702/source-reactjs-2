import * as types from '../constants/actionTypes';

export const addService = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/salons/${id}/services?include=salon`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const getServices = (id, page, limit) => (dispatch, getState) => {
  const params = {
    page,
    limit
  };

  return dispatch({
    types: [types.API_REQUEST_SEND, types.SERVICE_SET_BROWSE, types.API_REQUEST_ERROR],
    payload: {
      request: {
        url: `api/v1/salons/${id}/services?include=salon`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getState().auth.user.token}`
        },
        params
      }
    }
  })
};

export const getService = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/services/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  }
});

export const editService = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/services/${id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const deleteService = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SERVICE_DELETE_ITEM, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/services/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
});