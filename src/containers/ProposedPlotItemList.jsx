import React from 'react';
import Relay from 'react-relay';
import ScoreCard from 'components/ScoreCard';


class ProposedPlotItemList extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
  };

  renderPlotItemCard(plotItem) {
    const { contributor } = this.props;
    return (
      <ScoreCard
        id={plotItem.id}
        score={plotItem.voteScore}
        title={plotItem.name}
        description={plotItem.description}
        onUpvote={(id) => console.log(id)}
        />
    );
  }

  render() {
    const { plotItems } = this.props;
    return (
      <div>
        {plotItems.edges.map(edge => this.renderPlotItemCard(edge.node))}
      </div>
    );
  }
}

export default Relay.createContainer(ProposedPlotItemList, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        username
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        edges {
          node {
            id
            voteScore
            name
            description
          }
        }
      }
    `
  }
});
