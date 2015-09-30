import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const target = document.getElementById('root');

const node = (
  <Root routerHistory={createBrowserHistory()} />
);
ReactDOM.render(node, target);
