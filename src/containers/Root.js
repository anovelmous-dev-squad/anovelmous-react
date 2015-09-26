import React        from 'react';
import { Router }   from 'react-router';
import routes       from '../routes';
import ReactRouterRelay from 'react-router-relay';

export default class Root extends React.Component {

  static propTypes = {
    routerHistory  : React.PropTypes.object
  }

  constructor () {
    super();
  }

  renderRouter () {
    return (
      <Router
        history={this.props.routerHistory}
        createElement={ReactRouterRelay.createElement}
        >
        {routes}
      </Router>
    );
  }

  render () {
    return (
      <div style={{fontFamily: ['Open Sans', 'sans-serif']}}>
        {this.renderRouter()}
      </div>
    );
  }
}
