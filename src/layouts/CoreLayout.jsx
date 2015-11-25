import React from 'react';
import Header from 'components/Header';
import { Grid, Row, Cell } from 'react-inline-grid';

const CoreLayout = (props) => {
  return (
    <Grid>
      <Row is="center">
        <Cell is="10 tablet-8 phone-4">
          <Header />
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
