import * as AuthActions from '../../actions';

import React, { Component } from 'react';

import { Login } from '../../views/Pages';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LoginPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        { this.props.auth.user.token && <Redirect to={{pathname: '/'}}/> }
        { !this.props.auth.user.token && <Login {...this.props} /> }
      </div>
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
