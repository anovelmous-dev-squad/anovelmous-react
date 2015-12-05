import React from 'react';
import Relay from 'react-relay';
import ScoreCard from 'components/ScoreCard';

class ProposedPlotList extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    plots: React.PropTypes.object.isRequired,
    onUpvote: React.PropTypes.func,
    onDownvote: React.PropTypes.func,
    onUndoVote: React.PropTypes.func,
  };

  static defaultProps = {
    onUpvote: () => {},
    onDownvote: () => {},
    onUndoVote: () => {},
  };

  renderPlotCard(plot) {
    const { contributor, onUpvote, onDownvote, onUndoVote } = this.props;
    return (
      <ScoreCard
        id={plot.id}
        score={plot.voteScore}
        title={contributor.username + '\'s Idea'}
        description={plot.summary}
        userScore={plot.vote ? plot.vote.score : 0}
        onUndoVote={onUndoVote}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        />
    );
  }

  render() {
    const { plots } = this.props;
    return (
      <div>
        {plots.edges.map(edge => this.renderPlotCard(edge.node))}
      </div>
    );
  }
}

export default Relay.createContainer(ProposedPlotList, {
  initialVariables: {
    contributorId: 'Q29udHJpYnV0b3I6MQ==',
  },
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        username
      }
    `,
    plots: () => Relay.QL`
      fragment on PlotConnection {
        edges {
          node {
            id
            voteScore
            summary
            vote(contributorId: $contributorId) {
              score
            }
          }
        }
      }
    `
  }
});
