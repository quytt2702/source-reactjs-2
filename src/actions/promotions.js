import * as types from '../constants/actionTypes';

export const addPromotion = (data) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.API_REQUEST_SUCCESS, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/promotions`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      },
      data
    }
  }
});

export const getPromotions = (page, limit) => (dispatch, getState) => {
  const params = {
    page,
    limit
  };

  return dispatch({
    types: [types.API_REQUEST_SEND, types.PROMOTION_SET_BROWSE, types.API_REQUEST_ERROR],
    payload: {
      request: {
        url: 'api/v1/promotions',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getState().auth.user.token}`
        },
        params
      }
    }
  })
};


export const deletePromotion = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.PROMOTION_DELETE_ITEM, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/promotions/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
});