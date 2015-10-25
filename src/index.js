import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const target = document.getElementById('root');

const node = (
  <Root routerHistory={createBrowserHistory()} />
);
ReactDOM.render(node, target);
