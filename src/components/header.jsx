import React, { PropTypes } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    background: 'blue',
    border: 0,
    borderRadius: 4,
    color: 'white',
    padding: '1.5em'
  },
  block: {
    display: 'block',

    ':hover': {
      boxShadow: '0 3px 0 rgba(0,0,0,0.2)'
    }
  }
};

@Radium
export default class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { title } = this.props;

    return (
      <div style={[styles.base, styles.block]}>
        <h2>{title}</h2>
      </div>
    );
  }
}
