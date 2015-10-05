import React from 'react';
import { Grid, Row, Cell } from 'react-inline-grid';

export default class SidebarLayout extends React.Component {
  static propTypes = {
    content: React.PropTypes.element,
    sidebar: React.PropTypes.element
  }

  render() {
    const { content, sidebar } = this.props;

    return (
      <Grid>
        <Row is="around tablet-start phone-start">
          <Cell is="8 tablet-5 phone-4">
            {content}
          </Cell>
          <Cell is="4 tablet-3 phone-4">
            {sidebar}
          </Cell>
        </Row>
      </Grid>
    );
  }
}
