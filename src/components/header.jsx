import React, { PropTypes } from 'react';

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
      <div>{title}</div>
    );
  }

}
