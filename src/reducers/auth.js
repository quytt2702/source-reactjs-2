import * as types from '../constants/actionTypes';

import {
  Cookies
} from 'react-cookie';

const cookies = new Cookies();
let initialState = cookies.get('authState') ? cookies.get('authState') : {
  user: {}
};

export default function auth(state = initialState, action) {
  let authState = state;

  switch (action.type) {
    case types.AUTH_SET_TOKEN:
      authState = {
        user: {
          token: action.payload.data.access_token,
        }
      };
      break;

    case types.AUTH_SET_USER:
      if (!action.payload.data.data.attributes.roles.includes('super_admin')) {
        return authState = {
          user: {}
        };
      }
      authState = {
        user: {
          ...authState.user,
          name: action.payload.data.data.attributes.name,
          phone: action.payload.data.data.attributes.phone,
          email: action.payload.data.data.attributes.email,
          roles: action.payload.data.data.attributes.roles,
        }
      };
      break;

    case types.AUTH_DISCARD_TOKEN:
      authState = {
        user: {}
      };
      break;

    default:
      authState = state;
  }

  cookies.set('authState', {
    user: authState.user,
  }, {
    path: '/'
  });

  return authState;
};
