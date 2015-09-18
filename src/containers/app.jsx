import React from 'react';
import Relay from 'react-relay';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store from 'stores';
import routes from 'routes';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';
import Chapter from 'components/chapter';

class ClientApp extends React.Component {
  static propTypes = {
    initialState : React.PropTypes.object
  }

  constructor () {
    super();
  }

  renderDevTools () {
    return (
      <DebugPanel top right bottom key='debugPanel'>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }

  renderRouter () {
    if (__SERVER__) {
      return (
        <Router {...this.props.initialState} />
      );
    } else {
      return (
        <Router>
          {routes}
        </Router>
      );
    }
  }

  render () {
    return (
      <div>
        {__DEBUG__ && this.renderDevTools()}
        <Provider store={store}>
          {this.renderRouter()}
        </Provider>
      </div>
    );
  }
}

export default Relay.createContainer(ClientApp, {
  fragments: {
    novels: () => Relay.QL`
      fragment on Novel @relay(plural: true) {
        title,
        chapters {
          edges {
            node {
              ${Chapter.getFragment('chapter')}
            }
          }
        }
      }
    `
  }
});
