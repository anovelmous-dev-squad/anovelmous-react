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

  renderVocabCard(token) {
    return (
      <VocabCard key={token.id}
                 term={token.content}
                 onSubmit={this._handleVoteCast} />
    );
  }

  render() {
    const { contributor } = this.props;

    return (
      <div>
        {contributor.vocabulary.edges.map(edge => (
          this.renderVocabCard(edge.node)
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
