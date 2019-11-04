import * as types from '../constants/actionTypes';

export const deleteImage = (id) => (dispatch, getState) => dispatch({
  types: [types.API_REQUEST_SEND, types.API_REQUEST_SUCCESS, types.API_REQUEST_ERROR],
  payload: {
    request: {
      url: `api/v1/images/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getState().auth.user.token}`
      }
    }
  },
  id: id
});