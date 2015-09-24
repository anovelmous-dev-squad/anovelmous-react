import React        from 'react';
import { Router }   from 'react-router';
import routes       from '../routes';
import ReactRouterRelay from 'react-router-relay';

export default class Root extends React.Component {

  // routerHistory is provided by the client bundle to determine which
  // history to use (memory, hash, browser). routingContext, on the other hand,
  // is provided by the server and provides a full router state.
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
      <div>
        {this.renderRouter()}
      </div>
    );
  }
}
