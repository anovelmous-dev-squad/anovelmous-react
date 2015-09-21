import { Route }   from 'react-router';
import React       from 'react';
import Relay       from 'react-relay';
import CoreLayout  from 'layouts/CoreLayout';
import LiveView    from 'views/LiveView';

const viewerQueries = {
  contributor: () => Relay.QL`query RootQuery { viewer }`
};

export default (
  <Route component={CoreLayout}>
    <Route
      name='live'
      path='/'
      component={LiveView}
      queries={viewerQueries}
    />
  </Route>
);
