import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import AddUserPage from '../../../views/Users/AddUser';
import EditUserPage from '../../../views/Users/EditUser';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class User extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.ViewComponent = AddUserPage;
  }

  componentWillMount = async () => {
    if (this.props.match.params.id) {
      this.ViewComponent = EditUserPage;
      await this.props.actions.getUser(this.props.match.params.id).then(res => {
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
)(User);