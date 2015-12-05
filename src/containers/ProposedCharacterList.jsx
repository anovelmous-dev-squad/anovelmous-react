import React from 'react';
import Relay from 'react-relay';
import ScoreCard from 'components/ScoreCard';


class ProposedCharacterList extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    onUpvote: React.PropTypes.func,
    onDownvote: React.PropTypes.func,
    onUndoVote: React.PropTypes.func,
  };

  renderCharacterCard(character) {
    const { onUpvote, onDownvote, onUndoVote } = this.props;
    return (
      <ScoreCard
        id={character.id}
        score={character.voteScore}
        title={character.firstName}
        description={character.bio}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        onUndoVote={onUndoVote}
        />
    );
  }

  render() {
    const { characters } = this.props;
    return (
      <div>
        {characters.edges.map(edge => this.renderCharacterCard(edge.node))}
      </div>
    );
  }
}

export default Relay.createContainer(ProposedCharacterList, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        username
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        edges {
          node {
            id
            firstName
            bio
            voteScore
          }
        }
      }
    `
  }
});
