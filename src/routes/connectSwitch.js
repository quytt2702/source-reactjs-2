import {
  Switch
} from 'react-router';
import {
  connect
} from 'react-redux';

const mapStateToProps = state => {
  return {
    location: state.routing.location
  };
};

const ConnectedSwitch = connect(mapStateToProps)(Switch);

export default ConnectedSwitch;
