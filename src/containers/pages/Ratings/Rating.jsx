import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import AddRatingPage from '../../../views/Ratings/AddRating';
import EditRatingPage from '../../../views/Ratings/EditRating';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Rating extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.ViewComponent = AddRatingPage;
  }

  componentWillMount = async () => {
    if (this.props.match.params.id) {
      this.ViewComponent = EditRatingPage;
      await this.props.actions.getRating(this.props.match.params.id).then(res => {
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
  ratings: {
    ...state.ratings
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);