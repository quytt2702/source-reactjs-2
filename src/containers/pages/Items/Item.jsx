import * as AuthActions from '../../../actions';

import React, { Component } from 'react';

import AddItemPage from '../../../views/Items/AddItem';
import EditItemPage from '../../../views/Items/EditItem';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Item extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.ViewComponent = AddItemPage;
  }

  componentWillMount = async () => {
    if (this.props.match.params.item_id) {
      this.ViewComponent = EditItemPage;
      await this.props.actions.getItem(this.props.match.params.item_id).then(res => {
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
)(Item);