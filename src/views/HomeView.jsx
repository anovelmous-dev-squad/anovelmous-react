import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgb(255, 255, 255)'
  }
};

@Radium
export default class HomeView extends React.Component {
  render() {
    return (
      <div style={styles.base}>
        <h1>Welcome to Anovelmous!</h1>
        <Link to="/contribute/2"><button>Contribute to the current novel!</button></Link>
      </div>
    );
  }
}
