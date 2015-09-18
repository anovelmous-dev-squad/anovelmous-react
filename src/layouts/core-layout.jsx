import React  from 'react';
import Relay from 'react-relay';
import './core-layout.scss';
import Header from 'components/header';

export default class CoreLayout extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        <Header title="Anovelmous"/>
        <div className='page-container'>
          <div className='view-container'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
