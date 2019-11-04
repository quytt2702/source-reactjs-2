import ConnectSwitch from './connectSwitch';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Route from 'react-router/Route';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';

const RenderRoutes = ({ routes, location, auth }) => {
  return (
    <ConnectSwitch>
      { routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          strict={route.strict}
          exact={route.exact}
          render={(props) => (
            <div>
              {
                route.requireLogin && route.requireLogin !== location.pathname && !auth.token &&
                <Redirect to={{
                  pathname: route.requireLogin
                }} />
              }
              {
                (
                  !route.requireLogin ||
                  auth.token ||
                  !route.path ||
                  route.requireLogin === route.path
                ) &&
                <route.component {...props} route={route}/>
              }
            </div>
          )}
        />
      ))}
    </ConnectSwitch>
  )
}

RenderRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth.user
});

export default withRouter(connect(mapStateToProps, null)(RenderRoutes));
