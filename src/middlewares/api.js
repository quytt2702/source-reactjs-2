import {
  Cookies
} from 'react-cookie';
import axios from 'axios';
import {
  getActionTypes
} from 'redux-axios-middleware';
import normalize from 'json-api-normalizer';

const API_URL = process.env.REACT_APP_API_URL || 'localhost:9000';
const cookies = new Cookies();

export const apiClients = {
  default: {
    client: axios.create({
      baseURL: API_URL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  },
  upload: {
    client: axios.create({
      baseURL: API_URL,
      responseType: 'json',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [(data) => {
        let formData = new FormData();
        for (var e in data) {
          if (data[e] && data[e].name) {
            formData.append(e, data[e], data[e].name);
          }
        }
        return formData;
      }]
    })
  },

};

export const apiMiddlewareConfig = {
  interceptors: {
    request: [
      function ({
        getState,
        dispatch,
        getSourceAction
      }, req) {
        // req: contains information about request object
        if (cookies.get('authState') && cookies.get('authState').role) {
          req.headers.role = cookies.get('authState').role;
        }
        return req;
      }
    ]
  },
  onSuccess: ({
    action,
    next,
    response
  }, options) => {

    let id, schemaData;
    if ((action.jsonapi === true || action.jsonapi === undefined) && response.status !== 204) {
      schemaData = normalize(response.data, {
        camelizeTypeValues: false,
        camelizeKeys: false
      });
    }

    if (action.payload.request.method === 'DELETE') {
      id = action.id || null;
    }

    const nextAction = {
      type: getActionTypes(action, options)[1],
      schema: schemaData,
      payload: response,
      meta: {
        previousAction: action
      },
      id
    };
    next(nextAction);
    return nextAction;
  },

  onError: ({
    action,
    next,
    error,
    dispatch
  }, options) => {
    if (error.response && error.response.status === 401) {
      cookies.set('authState', {
        user: {},
      }, {
        path: '/'
      });
      return Promise.reject(error.response);
    }

    let errorObject;
    if (!error.response) {
      errorObject = {
        data: error.message,
        status: 0
      };
      if (process.env.NODE_ENV !== 'production') {
        console.log('HTTP Failure in Axios', error);
      }
    } else {
      errorObject = error;
    }
    const nextAction = {
      type: getActionTypes(action, options)[2],
      error: errorObject,
      meta: {
        previousAction: action
      }
    };

    next(nextAction);
    return nextAction;
  }
};