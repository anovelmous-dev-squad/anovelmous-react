import React from 'react';
import Relay from 'react-relay';
import ScoreCard from 'components/ScoreCard';


class ProposedPlotList extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    plots: React.PropTypes.object.isRequired,
  };

  renderPlotCard(plot) {
    const { contributor } = this.props;
    return <ScoreCard title={contributor.firstName + '\'s Idea'} description={plot.summary} />;
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
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        firstName
      }
    `,
    plots: () => Relay.QL`
      fragment on PlotConnection {
        edges {
          node {
            summary
          }
        }
      }
    `
  }
});
