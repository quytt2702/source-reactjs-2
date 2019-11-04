import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import AddServicePage from '../../../views/Services/AddService';
import EditServicePage from '../../../views/Services/EditService';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Service extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.ViewComponent = AddServicePage;
  }

  componentWillMount = async () => {
    if (this.props.match.params.service_id) {
      this.ViewComponent = EditServicePage;
      await this.props.actions.getService(this.props.match.params.service_id).then(res => {
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
)(Service);