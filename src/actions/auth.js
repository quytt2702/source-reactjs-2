import * as types from '../constants/actionTypes';

export const login = (data) => {
  data.platform = 'web_admin';
  return {
    types: [types.API_REQUEST_SEND, types.AUTH_SET_TOKEN, types.AUTH_DISCARD_TOKEN],
    payload: {
      request: {
        url: 'api/v1/auth/login',
        method: 'POST',
        data
      }
    },
    jsonapi: false
  }
};

export const me = () => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.AUTH_SET_USER, types.AUTH_DISCARD_TOKEN],
  payload: {
    request: {
      url: 'api/v1/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  jsonapi: false
});

export const logout = () => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.AUTH_DISCARD_TOKEN, types.AUTH_DISCARD_TOKEN],
  payload: {
    request: {
      url: 'api/v1/auth/logout',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  jsonapi: false
});