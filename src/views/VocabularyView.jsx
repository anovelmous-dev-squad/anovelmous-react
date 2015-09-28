import React from 'react';
import Relay from 'react-relay';

class VocabularyView extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired
  }

  render() {
    const { contributor } = this.props;

    return (
      <ul>
        {contributor.vocabulary.edges.map(edge => (
          <li key={edge.node.id}>{edge.node.content}</li>
        ))}
      </ul>
    );
  }
}

export default Relay.createContainer(VocabularyView, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        vocabulary(first: 4) {
          edges {
            node {
              id
              content
            }
          }
        }
      }
    `
  }
});
