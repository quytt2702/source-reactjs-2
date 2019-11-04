import './polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers';
import { createBrowserHistory } from 'history';
// disable ServiceWorker
import registerServiceWorker from './registerServiceWorker';
import routes from './routes/routes';
import storeConfigure from './storeConfigure';
import { syncHistoryWithStore } from 'react-router-redux';

const store = storeConfigure();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root store={store} routes={routes} history={history} />, document.getElementById('root'));
registerServiceWorker();
