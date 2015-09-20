import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class RelayView extends React.Component {
    static propTypes = {
      contributor: PropTypes.object.isRequired,
      novel: PropTypes.object.isRequired
    };

    render () {
      const { contributor, novel } = this.props;

      return (
        <div>
          <h1>Hello {contributor.name}!</h1>
          <h3>You are reading {novel.title}</h3>
      </div>
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
    `,
    novel: () => Relay.QL`
      fragment on Novel {
        id
        title
      }
    `
  }
});
