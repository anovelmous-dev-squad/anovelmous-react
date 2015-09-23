import React  from 'react';
import Header from 'components/Header';
import { Grid, Row, Cell } from 'react-inline-grid';

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor () {
    super();
  }

  render () {
    return (
      <Grid>
        <Row is="center">
          <Cell is="8 tablet-6 phone-4">
            <Header title="Anovelmous"/>
            {this.props.children}
          </Cell>
        </Row>
      </Grid>
    );
  }
}
