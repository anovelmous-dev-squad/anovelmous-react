import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgba(185, 42, 63, 0.95)',
    border: 0,
    borderRadius: 4,
    color: 'rgb(212, 208, 208)',
    paddingLeft: 30,
    paddingTop: 10,
    height: 80
  },
  brand: {
    ':hover': {
      color: 'rgb(234, 234, 237)'
    }
  }
};

@Radium
export default class Header extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired
  };

  render() {
    const { title } = this.props;

    return (
      <div style={styles.base}>
        <div style={styles.brand}>
          <h3>{title}</h3>
        </div>
      </div>
    );
  }
}
