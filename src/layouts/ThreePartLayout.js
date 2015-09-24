import React from 'react';
import { Grid, Row, Cell } from 'react-inline-grid';

export default class ThreePartLayout extends React.Component {
  static propTypes = {
    leftSidebar: React.PropTypes.element,
    middleContent: React.PropTypes.element,
    rightSidebar: React.PropTypes.element
  }

  render() {
    const { leftSidebar, middleContent, rightSidebar } = this.props;

    return (
      <Grid>
        <Row is="around tablet-start phone-start">
          <Cell is="3 tablet-2 phone-4">
            {leftSidebar}
          </Cell>
          <Cell is="6 tablet-4 phone-4">
            {middleContent}
          </Cell>
          <Cell is="3 tablet-2 phone-4">
            {rightSidebar}
          </Cell>
        </Row>
      </Grid>
    );
  }
}
