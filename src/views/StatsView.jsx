import React from 'react';
import Relay from 'react-relay';

class StatsView extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired
  }

  render() {
    const { contributor } = this.props;
    return (
      <div>
        <ul>
          {contributor.votes.edges.map(edge => (
            <li key={edge.node.id}>{edge.node.token.content}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(StatsView, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        votes(first: 5) {
          edges {
            node {
              id
              token {
                content
              }
            }
          }
        }
      }
    `
  }
});
