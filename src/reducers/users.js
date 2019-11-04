import * as types from '../constants/actionTypes';

import filter from 'lodash/filter';
import merge from 'lodash/merge';

const initialState = {
  schema: {},
  list: {
    data: [],
    links: {},
    meta: {}
  },
  show: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USER_SET_BROWSE:
      const newList = {
        ...state.show,
        list: action.payload.data,
        schema: action.schema,
      };
      state = newList;
      return state;
    case types.USER_SET_SHOW:
      state = {
        ...state.schema,
        show: action.payload.data.data,
        list: {
          ...state.list,
        },
      };
      return state;
    case types.USER_DELETE_ITEM:
      const data = filter(state.list.data, function (item) {
        return item.id !== action.id;
      });
      state = {
        show: state.show,
        schema: state.schema,
        list: {
          ...state.list,
          data: data
        },
      };
      return state;
    default:
      return state;
  }
}