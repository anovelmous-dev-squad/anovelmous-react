import React from 'react';
import { Link } from 'react-router';
import { AppBar, FontIcon, IconButton } from 'material-ui';

export default () => {
  const titleLogo = <img style={{marginTop: 8}} src="/assets/AnovelmousHeaderLogo.png"/>;
  return (
    <AppBar
      title={titleLogo}
      style={{maxHeight: 64}}
      iconElementRight={
        <Link to="/stats/">
          <IconButton tooltip="Statistics">
            <FontIcon className="material-icons" color="white">poll</FontIcon>
          </IconButton>
        </Link>
      }
      />
  );
};
