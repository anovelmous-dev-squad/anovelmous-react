import React from 'react';
import Relay from 'react-relay';
import VocabCard from 'components/VocabCard';

class CardVoter extends React.Component {
  static propTypes = {
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    voteText: React.PropTypes.string.isRequired,
    onVoteCast: React.PropTypes.func
  }

  _filterTerm = (term) => {
    return term.toLowerCase().startsWith(this.props.voteText);
  }

  renderVocabCard(id, term, description, tag) {
    return (
      <div key={id} style={{width: 150, padding: 5}}>
        <VocabCard
          term={term}
          tag={tag}
          description={description}
          onSelectVote={(text) => this.props.onVoteCast(id, text)}
          />
      </div>
    );
  }

  renderVocabCards(vocabulary, places, characters, plotItems) {
    const nonVocabLength = characters.slice(0, 2).length + places.slice(0, 2).length + plotItems.slice(0, 2).length;
    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {characters.slice(0, 2).map(edge => (
          this.renderVocabCard(
            edge.node.id,
            edge.node.firstName + ' ' + edge.node.lastName,
            edge.node.bio,
            'Character'
          )
        ))}
        {places.slice(0, 2).map(edge => (
          this.renderVocabCard(edge.node.id, edge.node.name, edge.node.description, 'Place')
        ))}
        {plotItems.slice(0, 2).map(edge => (
          this.renderVocabCard(edge.node.id, edge.node.name, edge.node.description, 'Plot Item')
        ))}
        {vocabulary.slice(0, 8 - nonVocabLength).map(edge => (
          this.renderVocabCard(edge.node.id, edge.node.content, '', 'Token')
        ))}
      </div>
    );
  }

  render() {
    const { voteText, vocabulary, places, characters, plotItems } = this.props;
    if (voteText === '') {
      return this.renderVocabCards(vocabulary.edges, places.edges, characters.edges, plotItems.edges);
    }

    const validPlaces = places.edges.filter(edge => this._filterTerm(edge.node.name));
    const validCharacters = characters.edges.filter(edge => this._filterTerm(edge.node.firstName));
    const validPlotItems = plotItems.edges.filter(edge => this._filterTerm(edge.node.name));
    const validVocab = vocabulary.edges.filter(edge => this._filterTerm(edge.node.content));
    return this.renderVocabCards(validVocab, validPlaces, validCharacters, validPlotItems);
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
            id
            name
            description
          }
        }
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        edges {
          node {
            id
            firstName
            lastName
            bio
          }
        }
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        edges {
          node {
            id
            name
            description
          }
        }
      }
    `
  }
});
