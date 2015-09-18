import React     from 'react';
import Relay     from 'react-relay';
import ReactDOM  from 'react-dom';
import Root      from 'containers/Root';
import configureStore from '../stores';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import AppHomeRoute from '../query-routes/AppHomeRoute';

const target = document.getElementById('root');
const store  = configureStore(window.__INITIAL_STATE__);

const node = (
  <Relay.RootContainer
    Component={Root}
    route={new AppHomeRoute({
      novelIds: ['1', '2']
    })}
    routerHistory={createBrowserHistory()} store={store}
  />
);
ReactDOM.render(node, target);
