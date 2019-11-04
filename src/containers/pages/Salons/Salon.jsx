import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import AddSalonPage from '../../../views/Salons/AddSalon';
import EditSalonPage from '../../../views/Salons/EditSalon';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Salon extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.ViewComponent = AddSalonPage;
  }

  componentWillMount = async () => {
    if (this.props.match.params.id) {
      this.ViewComponent = EditSalonPage;
      await this.props.actions.getSalon(this.props.match.params.id).then(res => {
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
)(Salon);