import React  from 'react';
import Header from 'components/Header';

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

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
