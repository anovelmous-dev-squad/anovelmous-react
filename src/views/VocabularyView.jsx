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
      <div style={ {width: 150, padding: 5} }>
        <VocabCard
          key={token.id}
          term={token.content}
          onSubmit={this._handleVoteCast} />
      </div>
    );
  }

  render() {
    const { contributor } = this.props;
    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
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
