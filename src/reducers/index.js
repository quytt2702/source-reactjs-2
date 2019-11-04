import auth from './auth';
import { combineReducers } from 'redux';
import items from './items';
import orders from './orders';
import ratings from './ratings';
import { routerReducer as routing } from 'react-router-redux';
import salons from './salons';
import services from './services';
import staticPages from './static_pages';
import blogs from './blogs';
import users from './users';
import promotions from './promotions';

const rootReducer = combineReducers({
  routing,
  auth,
  users,
  promotions,
  salons,
  staticPages,
  ratings,
  services,
  items,
  orders,
  blogs
});

export default rootReducer;
