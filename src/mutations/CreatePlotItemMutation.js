import Relay from 'react-relay';

export default class CreatePlotItemMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation{createPlotItem}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CreatePlotItemPayload {
        plotItemEdge
        viewer {
          plotItems
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'plotItems',
      edgeName: 'plotItemEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
  getVariables() {
    const { name, description, novelId } = this.props;
    return {
      name,
      description,
      novelId
    };
  }
  getOptimisticResponse() {
    const { name, description, viewer } = this.props;
    return {
      plotItemEdge: {
        node: {
          name,
          description
        }
      },
      viewer: {
        id: viewer.id
      }
    };
  }
}
