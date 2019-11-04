import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Services from '../../../views/Services/Services';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ServicesPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <Services {...this.props} />
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  },
  services: {
    ...state.services
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesPage);