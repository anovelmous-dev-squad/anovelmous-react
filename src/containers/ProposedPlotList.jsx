import React from 'react';
import Relay from 'react-relay';
import ScoreCard from 'components/ScoreCard';

import UpdateVoteScoreMutation from 'mutations/UpdateVoteScoreMutation';

class ProposedPlotList extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    plots: React.PropTypes.object.isRequired,
  };

  componentWillMount() {
    console.log(this.props.contributor.id)
    if (this.props.relay.variables.contributorId === '') {
      this.props.relay.setVariables({contributorId: this.props.contributor.id});
    }
  }

  _updateVoteScore(resourceId, addend) {
    const { contributor } = this.props;
    Relay.Store.update(
      new UpdateVoteScoreMutation({
        resourceId, contributor, addend
      })
    );
  }

  _handleUpvote = (plotId) => {
    this._updateVoteScore(plotId, 1);
  }

  _handleDownvote = (plotId) => {
    this._updateVoteScore(plotId, -1);
  }

  renderPlotCard(plot) {
    const { contributor } = this.props;
    return (
      <ScoreCard
        id={plot.id}
        score={plot.voteScore}
        title={contributor.username + '\'s Idea'}
        description={plot.summary}
        userScore={plot.vote ? plot.vote.score : 0}
        onUpvote={(id) => console.log(id)}
        onDownvote={(id) => console.log(id)}
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
