import { Route }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/core-layout';
import LiveView    from 'views/live-view';

export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={LiveView} />
  </Route>
);
