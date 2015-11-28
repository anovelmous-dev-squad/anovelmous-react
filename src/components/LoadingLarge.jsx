import React from 'react';
import { CircularProgress } from 'material-ui';

export default () => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <CircularProgress mode="indeterminate" size={2} />
    <img style={{maxHeight: '100%', maxWidth: '100%'}} src="/assets/AnovelmousLogoXLarge.png" />
  </div>
);
