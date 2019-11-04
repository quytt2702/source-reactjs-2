import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import Items from '../../../views/Items/Items';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ItemsPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <Items {...this.props} />
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  },
  items: {
    ...state.items
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsPage);