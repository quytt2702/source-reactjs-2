import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import AddPromotion from '../../../views/Promotions/AddPromotion';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Promotion extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.ViewComponent = AddPromotion;
  }

  render() {
    const ViewComponent = this.ViewComponent;
    return (
      <ViewComponent {...this.props} />
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
)(Promotion);