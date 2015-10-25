import Relay from 'react-relay';

export default class CreatePlotMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation{createPlot}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CreatePlotPayload {
        plotEdge
        viewer {
          plots
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'plots',
      edgeName: 'plotEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
  getVariables() {
    const { summary, novelId } = this.props;
    return {
      summary,
      novelId
    };
  }
  getOptimisticResponse() {
    const { summary, viewer } = this.props;
    return {
      plotEdge: {
        node: {
          summary
        }
      },
      viewer: {
        id: viewer.id
      }
    };
  }
}
