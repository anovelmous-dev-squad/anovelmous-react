import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class Chapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired
  }

  render () {
    const { chapter } = this.props;
    return (
      <div>
        <p>
          {chapter.tokens.edges.map(edge => (
            edge.node.content + ' '
          ))}
        </p>
      </div>
    );
  }
}

export default Relay.createContainer(Chapter, {
  fragments: {
    chapter: () => Relay.QL`
      fragment on Chapter {
        id
        tokens(first: 3) {
          edges {
            node {
              id
              content
            }
          }
        }
      }
    `
  }
});
