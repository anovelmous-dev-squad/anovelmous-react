import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class ChapterPane extends React.Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired
  }

  render () {
    const { chapter } = this.props;
    return (
      <div>
        <h3>{chapter.title}</h3>
        <p>
          {chapter.tokens.edges.map(edge => (
            edge.node.content + ' '
          ))}
        </p>
      </div>
    );
  }
}

export default Relay.createContainer(ChapterPane, {
  fragments: {
    chapter: () => Relay.QL`
      fragment on Chapter {
        id
        title
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
