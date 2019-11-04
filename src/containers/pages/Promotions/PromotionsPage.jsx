import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Promotions from '../../../views/Promotions/Promotions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PromotionsPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <Promotions {...this.props} />
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  },
  promotions: {
    ...state.promotions
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PromotionsPage);