import { BrowserRouter, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import React from 'react';
import RenderRoutes from '../routes/RenderRoutes';

const Root = ({ store, routes, history }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route history={history}>
        <RenderRoutes routes={routes} />
      </Route>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
}

export default Root;