import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { LinearProgress, AutoComplete } from 'material-ui';
import { getVotingRoundProgress } from 'utils';

const PROGRESS_BAR_UPDATE_INTERVAL = 200; // in ms

class Chapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    const { chapter } = this.props;
    this.state = {
      votingRoundProgress: getVotingRoundProgress(
        chapter.novel.prevVotingEnded, chapter.votingDuration
      ),
      intervalId: null
    };
  }

  componentDidMount() {
    this._updateVotingRoundProgress();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  _updateVotingRoundProgress() {
    const self = this;
    const intervalId = setInterval(() => {
      const { chapter } = self.props;
      self.setState({
        votingRoundProgress: getVotingRoundProgress(
          chapter.novel.prevVotingEnded, chapter.votingDuration
        )
      });
    }, PROGRESS_BAR_UPDATE_INTERVAL);
    this.setState({ intervalId });
  }

  render () {
    const { chapter } = this.props;
    const vocabTerms = chapter.vocabulary.edges.map(edge => edge.node);
    let dataSource = {};
    for (var i = 0; i < vocabTerms.length; i++) {
      const vocabTerm = vocabTerms[i];
      const autoCompleteItem = <AutoComplete.Item primaryText={vocabTerm.content} secondaryText="&#9786;" />;
      dataSource[vocabTerm.content] = autoCompleteItem;
    }

    return (
      <div>
        <span>{chapter.text} </span>
        <span>
          {!chapter.isCompleted &&
            <AutoComplete
              dataSource={dataSource}
              onUpdateInput={(t) => console.log(t)} />
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
        isCompleted
        votingDuration
        novel {
          prevVotingEnded
        }
        text
        vocabulary(first: 5000) {
          edges {
            node {
              id
              content
            }
          }
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
