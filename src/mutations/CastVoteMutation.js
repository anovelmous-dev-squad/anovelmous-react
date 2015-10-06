import Relay from 'react-relay';

export default class CastVoteMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `
  };
  getMutation() {
    return Relay.QL`mutation{castVote}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CastVotePayload {
        voteEdge
        viewer {
          votes
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'votes',
      edgeName: 'voteEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }
  getVariables() {
    const { tokenId, chapterId, ordinal } = this.props;
    return {
      tokenId,
      chapterId,
      ordinal
    };
  }
  getOptimisticResponse() {
    const { ordinal, viewer } = this.props;
    return {
      voteEdge: {
        node: {
          ordinal: ordinal
        }
      },
      viewer: {
        id: viewer.id
      }
    };
  }
}
