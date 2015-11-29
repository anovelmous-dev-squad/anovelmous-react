import React from 'react';
import { Grid, Row, Cell } from 'react-inline-grid';
import AnovelmousTopBar from 'components/AnovelmousTopBar';

const CoreLayout = (props) => {
  return (
    <Grid>
      <Row is="center">
        <Cell is="10 tablet-8 phone-4">
          <AnovelmousTopBar />
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
