import React from 'react';
import { connect } from 'react-redux';
import Header from 'components/header';
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';

@connect(state => ({
  sampleStore : state.sample
}))
export default class HomeView extends React.Component {
  constructor () {
    super();
  }

  render () {
    const { sampleStore } = this.props;

    return (
        <div className='view view--home container'>
          <p>{sampleStore}</p>
        </div>
    );
  }
}
