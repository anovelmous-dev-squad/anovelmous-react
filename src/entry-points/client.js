import React from 'react';
import Relay from 'react-relay';
import App from 'containers/app';
import ReactDOM from 'react-dom';
import AppHomeRoute from '../query-routes/AppHomeRoute';

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute({
      novelIds: ['1', '2']
    })}
  />,
  document.getElementById('mount')
);
