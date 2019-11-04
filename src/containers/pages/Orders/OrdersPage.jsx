import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import Orders from '../../../views/Orders/Orders';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class OrdersPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <Orders {...this.props} />
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  },
  orders: {
    ...state.orders
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersPage);