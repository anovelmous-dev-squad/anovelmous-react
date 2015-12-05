import Relay from 'react-relay';

export default class UpdateVoteScoreMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updateVoteScore}`;
  }

  getVariables() {
    const { resourceId, contributor, addend } = this.props;
    return {
      resourceId,
      contributorId: contributor.id,
      addend,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateVoteScore {
        newScore
      }
    `;
  }

  getConfigs() {
    return [];
  }

  static fragments = {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
      }
    `,
  };
}
