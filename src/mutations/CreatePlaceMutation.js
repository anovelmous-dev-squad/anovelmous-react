import Relay from 'react-relay';

export default class CreatePlaceMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation{createPlace}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CreatePlacePayload {
        placeEdge
        viewer {
          places
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'places',
      edgeName: 'placeEdge',
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
      characterEdge: {
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
