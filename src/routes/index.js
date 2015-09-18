import { Route }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import RelayView    from 'views/relay-view';

export default (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={RelayView} />
  </Route>
);
