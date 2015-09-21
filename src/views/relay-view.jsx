import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import VoteCaster from 'components/VoteCaster';
import Novel from 'components/Novel';

class RelayView extends React.Component {
    static propTypes = {
      contributor: PropTypes.object.isRequired
    };

    render () {
      const { contributor } = this.props;
      return (
        <div>
          <h1>Hello {contributor.name}!</h1>
          {contributor.novels.edges.map(edge => (
            <Novel key={edge.node.id} novel={edge.node}/>
          ))}
          <VoteCaster tokens={contributor.vocabulary}/>
      </div>
      );
    }
}

export default Relay.createContainer(RelayView, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        name
        novels(last: 1) {
          edges {
            node {
              id
              ${Novel.getFragment('novel')}
            }
          }
        }
        vocabulary(first: 5) {
          edges {
            node {
              id
              content
            }
          }
          ${VoteCaster.getFragment('tokens')}
        }
      }
    `
  }
});
