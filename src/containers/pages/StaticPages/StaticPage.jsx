import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import AddStaticPage from '../../../views/StaticPages/AddStaticPage';
import EditStaticPage from '../../../views/StaticPages/EditStaticPage';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class StaticPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.ViewComponent = AddStaticPage;
  }

  componentWillMount = async () => {
    if (this.props.match.params.id) {
      this.ViewComponent = EditStaticPage;
      await this.props.actions.getStaticPage(this.props.match.params.id).then(res => {
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
  staticPages: {
    ...state.staticPages
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticPage);