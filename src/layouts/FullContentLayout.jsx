import React from 'react';
import { Grid, Row, Cell } from 'react-inline-grid';

const FullContentLayout = (props) => {
  return (
    <Grid>
      <Row is="around tablet-start phone-start">
        <Cell is="12 tablet-8 phone-4">
          {props.content}
        </Cell>
      </Row>
    </Grid>
  );
};

FullContentLayout.propTypes = {
  content: React.PropTypes.element.isRequired
};

export default FullContentLayout;
