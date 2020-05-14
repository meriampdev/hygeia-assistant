import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

export default class CloseEmulator extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  };

  static contextTypes = {
    hideDemo: PropTypes.func.isRequired,
  };


  render() {
    return <Button {...this.props} onClick={()=> {}} />;
  }
}