import './app.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../assets/scss/style.css';

import * as Actions from '../actions/';

import React, { Component } from 'react';

import { Master } from './Layout';
import Proptypes from 'prop-types';
import RenderRoutes from '../routes/RenderRoutes';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';

class App extends Component {

  static propTypes = {
    route: Proptypes.object.isRequired
  }

  render() {
    const { route, location } = this.props;
    let currentPath;

    route.routes.forEach((route) => {
      const match = matchPath(location.pathname, {
        path: route.path,
        isExact: true,
        strict: true
      });
      if (match) {
        currentPath = match;
        return;
      }
    });

    currentPath = _.find(route.routes, { path: currentPath.path });

    return (
      <div>
        {
          currentPath && !currentPath.ignoreTemplate &&
           <Master container = {<RenderRoutes routes={route.routes} />} {...this.props} />
        }
        {
          (!currentPath || currentPath.ignoreTemplate) && <RenderRoutes routes={route.routes}/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
