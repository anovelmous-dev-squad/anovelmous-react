import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class RelayView extends React.Component {
    static propTypes = {
      contributor: PropTypes.object.isRequired
    };

    render () {
      const { contributor } = this.props;

      return (
        <div>Hello {contributor.name}!</div>
      );
    }
}

export default Relay.createContainer(RelayView, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        name
      }
    `
  }
});
