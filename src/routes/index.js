import { Route }   from 'react-router';
import React       from 'react';
import Relay       from 'react-relay';
import CoreLayout  from 'layouts/CoreLayout';
import RelayView    from 'views/relay-view';

const contributorQueries = {
  contributor: () => Relay.QL`query { contributor }`,
  novel: () => Relay.QL`query { liveNovel }`
};

export default (
  <Route component={CoreLayout}>
    <Route
      name='live'
      path='/'
      component={RelayView}
      queries={contributorQueries}
    />
  </Route>
);
