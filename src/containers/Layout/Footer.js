import React, { Component } from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Footer extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://m2b.io">M2B</a> &copy; 2018 creativeLabs.</span>
        <span className="ml-auto">Powered by <a href="https://fb.com/kun391">BowBowww</a></span>
      </React.Fragment>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
