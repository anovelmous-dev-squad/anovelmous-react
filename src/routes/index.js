import { Route }   from 'react-router';
import React       from 'react';
import Relay       from 'react-relay';
import CoreLayout  from 'layouts/CoreLayout';
import RelayView    from 'views/relay-view';

const viewerQueries = {
  contributor: () => Relay.QL`query RootQuery { viewer }`
};

export default (
  <Route component={CoreLayout}>
    <Route
      name='live'
      path='/'
      component={RelayView}
      queries={viewerQueries}
    />
  </Route>
);
