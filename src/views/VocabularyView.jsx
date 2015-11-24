import React from 'react';
import Relay from 'react-relay';
import VocabCard from 'components/VocabCard';

class VocabularyView extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  }

  _handleVoteCast = (term) => {
    console.log(term)
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
    const { viewer } = this.props;
    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {viewer.vocabulary.edges.map(edge => (
          this.renderVocabCard(edge.node)
        ))}
      </div>
    );
  }
}

export default Relay.createContainer(VocabularyView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
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
