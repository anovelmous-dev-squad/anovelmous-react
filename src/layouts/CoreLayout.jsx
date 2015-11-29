import React from 'react';
import { AppBar, FontIcon, IconButton } from 'material-ui';
import { Grid, Row, Cell } from 'react-inline-grid';

const CoreLayout = (props) => {
  const titleLogo = <img style={{marginTop: 8}} src="/assets/AnovelmousHeaderLogo.png"/>;
  return (
    <Grid>
      <Row is="center">
        <Cell is="10 tablet-8 phone-4">
          <AppBar
            title={titleLogo}
            style={{maxHeight: 64}}
            iconElementRight={
              <IconButton tooltip="Statistics">
                <FontIcon className="material-icons">poll</FontIcon>
              </IconButton>
            }
            />
          {props.children}
        </Cell>
      </Row>
    </Grid>
  );
};

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
