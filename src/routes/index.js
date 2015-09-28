import { Route } from 'react-router';
import React from 'react';
import Relay from 'react-relay';
import CoreLayout from 'layouts/CoreLayout';
import ContributeView from 'views/ContributeView';

const viewerQueries = {
  contributor: () => Relay.QL`query RootQuery { viewer }`
};

export default (
  <Route path='/' component={CoreLayout}>
    <Route
      name='contribute'
      path='contribute/:novelId'
      component={ContributeView}
      queries={viewerQueries}
    />
  </Route>
);
