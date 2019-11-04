import * as types from '../constants/actionTypes';

export const addSalon = (data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SALON_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/salons`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const getSalons = (page, limit) => (dispatch, getState) => {
  const params = {
    page,
    limit
  };

  return dispatch({
    types: [types.API_REQUEST_SEND, types.SALON_SET_BROWSE, types.API_REQUEST_ERROR],
    payload: {
      request: {
        url: 'api/v1/salons',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getState().auth.user.token}`
        },
        params
      }
    }
  })
};

export const getSalon = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SALON_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/salons/${id}?include=owners,times,images`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  }
});

export const editSalon = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SALON_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/salons/${id}?include=owners,times,images`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const deleteSalon = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.SALON_DELETE_ITEM, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/salons/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
});