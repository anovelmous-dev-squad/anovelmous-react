import { Route, IndexRoute } from 'react-router';
import React from 'react';
import Relay from 'react-relay';
import CoreLayout from 'layouts/CoreLayout';
import ContributeView from 'views/ContributeView';
import HomeView from 'views/HomeView';
import StatsView from 'views/StatsView';
import PrewritingView from 'views/PrewritingView';

const viewerQueries = {
  contributor: () => Relay.QL`query RootQuery { viewer }`
};

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route
      name="contribute"
      path="contribute/:novelId"
      component={ContributeView}
      queries={viewerQueries}
    />
    <Route
      name="stats"
      path="stats/"
      component={StatsView}
      queries={viewerQueries}
    />
    <Route
      name="prewriting"
      path="prewriting/:novelId"
      component={PrewritingView}
      queries={viewerQueries}
      />
  </Route>
);
