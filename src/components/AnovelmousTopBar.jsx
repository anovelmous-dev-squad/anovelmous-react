import React from 'react';
import { AppBar, FontIcon, IconButton } from 'material-ui';

export default () => {
  const titleLogo = <img style={{marginTop: 8}} src="/assets/AnovelmousHeaderLogo.png"/>;
  return (
    <AppBar
      title={titleLogo}
      style={{maxHeight: 64}}
      iconElementRight={
        <IconButton tooltip="Statistics">
          <FontIcon className="material-icons">poll</FontIcon>
        </IconButton>
      }
      />
  );
};
