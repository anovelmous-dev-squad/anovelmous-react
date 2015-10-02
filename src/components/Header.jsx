import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#BE1E2D',
    border: 0,
    borderRadius: 4,
    color: 'rgb(212, 208, 208)',
    paddingLeft: 30,
    paddingTop: 10,
    height: 80
  },
  brand: {
    maxHeight: '100%',
    maxWidth: '100%',

    ':hover': {
      color: 'rgb(234, 234, 237)'
    }
  }
};

@Radium
export default class Header extends React.Component {
  render() {
    return (
      <div style={styles.base}>
        <img style={styles.brand} src="/assets/AnovelmousHeaderLogoLarge.png"></img>
      </div>
    );
  }
}
