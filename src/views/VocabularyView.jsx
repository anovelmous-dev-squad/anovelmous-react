import React from 'react';
import Relay from 'react-relay';
import VocabCard from 'components/VocabCard';

class VocabularyView extends React.Component {
  static propTypes = {
    vocabulary: React.PropTypes.object.isRequired,
    voteText: React.PropTypes.string.isRequired
  }

  _handleVoteCast = (term) => {
    console.log(term);
  }

  _filterTerm = (term) => {
    return term.content.startsWith(this.props.voteText);
  }

  renderVocabCard(token) {
    return (
      <div key={token.id} style={{width: 150, padding: 5}}>
        <VocabCard
          term={token.content}
          onSubmit={this._handleVoteCast} />
      </div>
    );
  }

  render() {
    const { vocabulary, voteText } = this.props;
    const filteredVocabulary = (voteText === '') ?
      vocabulary.edges :
      vocabulary.edges.filter(edge => this._filterTerm(edge.node));

    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {filteredVocabulary.slice(0, 6).map(edge => (
          this.renderVocabCard(edge.node)
        ))}
      </div>
    );
  }
}

export default Relay.createContainer(VocabularyView, {
  fragments: {
    vocabulary: () => Relay.QL`
      fragment on VocabTermConnection {
        edges {
          node {
            id
            content
          }
        }
      }
    `
  }
});
