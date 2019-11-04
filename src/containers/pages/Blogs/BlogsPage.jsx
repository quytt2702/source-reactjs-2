import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Blogs from '../../../views/Blogs/Blogs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BlogsPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <Blogs {...this.props} />
    );
  };
};

const mapStateToProps = state => ({
  auth: {
    ...state.auth
  },
  blogs: {
    ...state.blogs
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogsPage);