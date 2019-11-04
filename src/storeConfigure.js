import { apiClients, apiMiddlewareConfig } from './middlewares/api';
import { applyMiddleware, compose, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import { multiClientMiddleware } from 'redux-axios-middleware';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const storeConfigure = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        multiClientMiddleware(apiClients, apiMiddlewareConfig),
        createLogger()
      )
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}

export default storeConfigure;
