import Relay from 'react-relay';

export default class CreateCharacterMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation{createCharacter}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CreateCharacterPayload {
        characterEdge
        viewer {
          characters
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'characters',
      edgeName: 'characterEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
  getVariables() {
    const { firstName, lastName, bio } = this.props;
    return {
      firstName,
      lastName,
      bio
    };
  }
  getOptimisticResponse() {
    const { firstName, lastName, bio, viewer } = this.props;
    return {
      characterEdge: {
        node: {
          firstName,
          lastName,
          bio
        }
      },
      viewer: {
        id: viewer.id
      }
    };
  }
}
