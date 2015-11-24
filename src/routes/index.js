import { Route, IndexRoute } from 'react-router';
import React from 'react';
import Relay from 'react-relay';
import CoreLayout from 'layouts/CoreLayout';
import ContributeView from 'views/ContributeView';
import HomeView from 'views/HomeView';
import StatsView from 'views/StatsView';
import PrewritingView from 'views/PrewritingView';

const CONTRIBUTOR_ID = 'Q29udHJpYnV0b3I6MQ==';

const viewerQueryConfig = {
  viewer: () => Relay.QL`query { viewer }`
};

const contributorQueryConfig = {
  contributor: () => Relay.QL`query { contributor(id: $contributorId) }`
};

const contributeQueryConfig = {
  contributor: () => Relay.QL`query { contributor(id: $contributorId) }`,
  viewer: () => Relay.QL`query { viewer }`
};

const prepareContributeParams = (params, route) => {
  return {
    ...params,
    contributorId: CONTRIBUTOR_ID
  };
};

export default (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route
      name="contribute"
      path="contribute/:novelId"
      component={ContributeView}
      queries={contributeQueryConfig}
      stateParams={['contributorId']}
      prepareParams={prepareContributeParams}
    />
    <Route
      name="stats"
      path="stats/"
      component={StatsView}
      queries={viewerQueryConfig}
    />
    <Route
      name="prewriting"
      path="prewriting/:novelId"
      component={PrewritingView}
      queries={viewerQueryConfig}
      />
  </Route>
);
