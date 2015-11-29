import React from 'react';
import Relay from 'react-relay';
import VocabCard from 'components/VocabCard';

class CardVoter extends React.Component {
  static propTypes = {
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    voteText: React.PropTypes.string.isRequired
  }

  _handleVoteCast = (term) => {
    console.log(term);
  }

  _filterTerm = (term) => {
    const textField = term.content || term.name || term.firstName
    return textField.startsWith(this.props.voteText);
  }

  renderVocabCard(term) {
    return (
      <div key={term.id} style={{width: 150, padding: 5}}>
        <VocabCard
          term={term.content || term.name || term.firstName}
          onSubmit={this._handleVoteCast} />
      </div>
    );
  }

  render() {
    const { voteText, vocabulary, places, characters, plotItems } = this.props;
    const allTerms = characters.edges.concat(places.edges, plotItems.edges, vocabulary.edges);
    const cardTexts = (voteText === '') ? allTerms : allTerms.filter(edge => this._filterTerm(edge.node));

    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {cardTexts.slice(0, 8).map(edge => (
          this.renderVocabCard(edge.node)
        ))}
      </div>
    );
  }
}

export default Relay.createContainer(CardVoter, {
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
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        edges {
          node {
            name
          }
        }
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        edges {
          node {
            firstName
          }
        }
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        edges {
          node {
            name
          }
        }
      }
    `
  }
});
