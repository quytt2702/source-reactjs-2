import * as types from '../constants/actionTypes';

export const addStaticPage = (data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.STATIC_PAGE_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/staticPages`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const getStaticPages = (page, limit) => (dispatch, getState) => {
  const params = {
    page,
    limit
  };

  return dispatch({
    types: [types.API_REQUEST_SEND, types.STATIC_PAGE_SET_BROWSE, types.API_REQUEST_ERROR],
    payload: {
      request: {
        url: 'api/v1/staticPages',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getState().auth.user.token}`
        },
        params
      }
    }
  })
};

export const getStaticPage = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.STATIC_PAGE_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/staticPages/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  }
});

export const editStaticPage = (id, data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.STATIC_PAGE_SET_SHOW, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/staticPages/${id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const deleteStaticPage = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.STATIC_PAGE_DELETE_ITEM, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/staticPages/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
});