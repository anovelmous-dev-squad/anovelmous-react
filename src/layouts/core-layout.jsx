import React  from 'react';
import './core-layout.scss';
import { Grid, Col } from 'react-bootstrap';
import Header from 'components/header';

export default class CoreLayout extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <Grid>
        <Header title="Anovelmous"/>
        <div className='page-container'>
          <div className='view-container'>
            {this.props.children}
          </div>
        </div>
      </Grid>
    );
  }
}
