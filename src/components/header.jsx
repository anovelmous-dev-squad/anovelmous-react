import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, Col } from 'react-bootstrap';

export default class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor () {
    super();
  }

  render () {
    const { title } = this.props;

    return (
        <Navbar>
          <Nav>
            <NavItem>
              <i className="fa fa-bars"></i>
            </NavItem>
            <NavItem>
              {title}
            </NavItem>
          </Nav>
        </Navbar>
    );
  }

}
