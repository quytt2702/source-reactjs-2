import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Salons from '../../../views/Salons/Salons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SalonsPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <Salons {...this.props} />
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  },
  salons: {
    ...state.salons
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalonsPage);