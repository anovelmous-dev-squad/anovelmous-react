import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { LinearProgress, AutoComplete } from 'material-ui';
import { getVotingRoundProgress } from 'utils';

const PROGRESS_BAR_UPDATE_INTERVAL = 200; // in ms

class Chapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    onVoteChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    const { chapter } = this.props;
    const vocabTerms = chapter.vocabulary.edges.map(edge => edge.node);
    let dataSource = {};
    vocabTerms.map(term => {
      dataSource[term.content] = this._getAutoCompleteItem(term);
      return term;
    });
    this.state = {
      votingRoundProgress: getVotingRoundProgress(
        chapter.novel.prevVotingEnded, chapter.votingDuration
      ),
      intervalId: null,
      dataSource
    };
  }

  componentDidMount() {
    this._updateVotingRoundProgress();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  _getAutoCompleteItem(vocabTerm) {
    return <AutoComplete.Item primaryText={vocabTerm.content} secondaryText="&#9786;" />;
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

  _autoCompleteFilter(searchText, key) {
    if (searchText.length > 2) {
      return key.startsWith(searchText);
    }
    if (searchText === key) {
      return true;
    }
    return false;
  }

  render () {
    const { chapter } = this.props;
    return (
      <div>
        <span>{chapter.text} </span>
        {!chapter.isCompleted &&
          <span>
            <AutoComplete
              dataSource={this.state.dataSource}
              floatingLabelText={'your contribution here'}
              onUpdateInput={(text) => this.props.onVoteChange(text)}
              filter={this._autoCompleteFilter} />
          </span>
        }
        {!chapter.isCompleted &&
          <LinearProgress
            mode="determinate"
            value={this.state.votingRoundProgress.percentComplete} />
        }
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
      }
    `
  }
});
