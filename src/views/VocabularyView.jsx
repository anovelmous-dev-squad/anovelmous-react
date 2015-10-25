import React from 'react';
import Relay from 'react-relay';
import VocabCard from 'components/VocabCard';

class VocabularyView extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired
  }

  _handleVoteCast = (term) => {
    console.log(term)
  }

  render() {
    const { contributor } = this.props;

    return (
      <div>
        {contributor.vocabulary.edges.map(edge => (
          <VocabCard key={edge.node.id}
                     term={edge.node.content}
                     onSubmit={this._handleVoteCast} />
        ))}
      </div>
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
