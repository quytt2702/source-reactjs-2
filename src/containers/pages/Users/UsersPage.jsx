import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Users from '../../../views/Users/Users';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UsersPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <Users {...this.props} />
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  },
  users: {
    ...state.users
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);