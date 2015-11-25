import React from 'react';
import { Link } from 'react-router';

export default class HomeView extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Anovelmous!</h1>
        <Link to={"/contribute/novel/Tm92ZWw6Mg==/chapter/Q2hhcHRlcjoz"}><button>Contribute to the current novel!</button></Link>
        <Link to="/stats/"><button>Check out stats</button></Link>
        <Link to="/prewriting/Tm92ZWw6Mg==/"><button>Prewrite for the novel</button></Link>
      </div>
    );
  }
}
