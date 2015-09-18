import React from 'react';
import Relay from 'react-relay';

class Chapter extends React.Component {
  render () {
    const { chapter } = this.props;

    return <div>{chapter.title}</div>
  }
}

export default Relay.createContainer(Chapter, {
  fragments: {
    chapter: () => Relay.QL`
      fragment on Chapter {
        title
      }
    `
  }
});
