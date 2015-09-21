import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Chapter from 'components/Chapter';

class Novel extends React.Component {
  static propTypes = {
    novel: PropTypes.object.isRequired
  }

  render () {
    const { novel } = this.props;
    return (
      <div>
        <h3>{novel.title}</h3>
        {novel.chapters.edges.map(edge => (
          <Chapter key={edge.node.id} chapter={edge.node}/>
        ))}
      </div>
    );
  }
}

export default Relay.createContainer(Novel, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        title
        chapters(first: 2) {
          edges {
            node {
              id
              ${Chapter.getFragment('chapter')}
            }
          }
        }
      }
    `
  }
});
