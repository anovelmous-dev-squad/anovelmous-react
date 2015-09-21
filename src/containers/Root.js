import React        from 'react';
import { Router }   from 'react-router';
import invariant    from 'invariant';
import routes       from '../routes';
import { RoutingContext } from 'react-router';
import ReactRouterRelay from 'react-router-relay';

export default class Root extends React.Component {

  // routerHistory is provided by the client bundle to determine which
  // history to use (memory, hash, browser). routingContext, on the other hand,
  // is provided by the server and provides a full router state.
  static propTypes = {
    routerHistory  : React.PropTypes.object,
    routingContext : React.PropTypes.object
  }

  constructor () {
    super();
  }

  renderRouter () {
    invariant(
      this.props.routingContext || this.props.routerHistory,
      '<Root /> needs either a routingContext or routerHistory to render.'
    );

    if (this.props.routingContext) {
      return <RoutingContext {...this.props.routingContext} />;
    } else {
      return (
        <Router
          history={this.props.routerHistory}
          createElement={ReactRouterRelay.createElement}
        >
          {routes}
        </Router>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderRouter()}
      </div>
    );
  }
}
