import * as types from '../constants/actionTypes';

export const addOrder = (data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.ORDER_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/orders?include=salon,user`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const getOrders = (page, limit) => (dispatch, getState) => {
  const params = {
    page,
    limit
  };

  return dispatch({
    types: [types.API_REQUEST_SEND, types.ORDER_SET_BROWSE, types.API_REQUEST_ERROR],
    payload: {
      request: {
        url: 'api/v1/orders?include=salon,user',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getState().auth.user.token}`
        },
        params
      }
    }
  })
};

export const getOrder = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.ORDER_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/orders/${id}?include=owners,times,images`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  }
});

export const editOrder = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.ORDER_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/orders/${id}?include=owners,times,images`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const deleteOrder = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.ORDER_DELETE_ITEM, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/orders/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
  });