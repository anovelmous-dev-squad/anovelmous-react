import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { TextField } from 'material-ui';

class Chapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    allowContribute: PropTypes.bool.isRequired
  }

  render () {
    const { chapter, allowContribute } = this.props;
    const chapterText = chapter.tokens.edges.map(edge => edge.node.token.content).join(' ');
    return (
      <div>
        <span>{chapterText} </span>
        <span>
          {allowContribute &&
            <TextField
              hintText="..."
              underlineFocusStyle={{borderColor: 'red'}} />
          }
        </span>
      </div>
    );
  }
}

export default Relay.createContainer(Chapter, {
  fragments: {
    chapter: () => Relay.QL`
      fragment on Chapter {
        id
        tokens(first: 500) {
          edges {
            node {
              id
              token {
                content
              }
            }
          }
        }
      }
    `
  }
});
