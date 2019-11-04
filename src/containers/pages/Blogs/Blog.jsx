import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import AddBlog from '../../../views/Blogs/AddBlog';
import EditBlog from '../../../views/Blogs/EditBlog';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Blog extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.ViewComponent = AddBlog;
  }

  componentWillMount = async () => {
    if (this.props.match.params.id) {
      this.ViewComponent = EditBlog;
      await this.props.actions.getBlog(this.props.match.params.id).then(res => {
        if (res.error && res.error.response && res.error.response.status === 404) {
          return this.props.history.push('/not-found');
        }
      });
    }
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
)(Blog);