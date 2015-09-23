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
        <Row>
          <Header title="Anovelmous"/>
        </Row>
        <Row>
          <Cell>
            {this.props.children}
          </Cell>
        </Row>
      </Grid>
    );
  }
}
