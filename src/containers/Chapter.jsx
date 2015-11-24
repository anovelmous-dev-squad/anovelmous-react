import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { LinearProgress, TextField } from 'material-ui';
import { getVotingRoundProgress } from 'utils';

const PROGRESS_BAR_UPDATE_INTERVAL = 200; // in ms

class Chapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    allowContribute: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    const { chapter } = this.props;
    this.state = {
      votingRoundProgress: getVotingRoundProgress(
        chapter.novel.prevVotingEnded, chapter.votingDuration
      )
    };
  }

  componentDidMount() {
    this._updateVotingRoundProgress();
  }

  _updateVotingRoundProgress() {
    const self = this;
    setInterval(() => {
      const { chapter } = self.props;
      self.setState({
        votingRoundProgress: getVotingRoundProgress(
          chapter.novel.prevVotingEnded, chapter.votingDuration
        )
      });
    }, PROGRESS_BAR_UPDATE_INTERVAL);
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
          <LinearProgress
            mode="determinate"
            value={this.state.votingRoundProgress.percentComplete} />
      </div>
    );
  }
}

export default Relay.createContainer(Chapter, {
  fragments: {
    chapter: () => Relay.QL`
      fragment on Chapter {
        id
        votingDuration
        novel {
          prevVotingEnded
        }
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
