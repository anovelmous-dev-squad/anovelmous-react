import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { LinearProgress, AutoComplete } from 'material-ui';
import { getVotingRoundProgress } from 'utils';

const PROGRESS_BAR_UPDATE_INTERVAL = 200; // in ms

class Chapter extends React.Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    vocabulary: PropTypes.object.isRequired,
    places: PropTypes.object.isRequired,
    characters: PropTypes.object.isRequired,
    plotItems: PropTypes.object.isRequired,
    readingHeight: PropTypes.number,
    onVoteChange: PropTypes.func,
    onVoteCast: PropTypes.func,
    voteText: PropTypes.string
  }

  constructor(props) {
    super(props);
    const { chapter, vocabulary, places, characters, plotItems } = this.props;
    const dataSource = {};
    vocabulary.edges.forEach(edge => (
      dataSource[edge.node.content] = this._getAutoCompleteItem(edge.node.content)
    ));
    places.edges.forEach(edge => (
      dataSource[edge.node.name] = this._getAutoCompleteItem(edge.node.name)
    ));
    characters.edges.forEach(edge => (
      dataSource[edge.node.firstName] = this._getAutoCompleteItem(edge.node.firstName)
    ));
    plotItems.edges.forEach(edge => (
      dataSource[edge.node.name] = this._getAutoCompleteItem(edge.node.name)
    ));

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

  _getAutoCompleteItem(text) {
    return <AutoComplete.Item primaryText={text} secondaryText="&#9786;" />;
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
    const { chapter, readingHeight } = this.props;
    return (
      <div>
        <div style={{height: readingHeight || 500, overflowY: 'scroll'}}>
          <span>{chapter.text} </span>
            {!chapter.isCompleted &&
              <span>
                <AutoComplete
                  dataSource={this.state.dataSource}
                  searchText={this.props.voteText}
                  floatingLabelText={'your contribution here'}
                  onUpdateInput={(text) => this.props.onVoteChange(text)}
                  onNewRequest={(e) => {
                    const text = (typeof e === 'string') ? e : e.props.primaryText;
                    return this.props.onVoteCast(text);
                  }}
                  filter={this._autoCompleteFilter} />
              </span>
            }
        </div>
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
      }
    `,
    vocabulary: () => Relay.QL`
      fragment on VocabTermConnection {
        edges {
          node {
            content
          }
        }
      }
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        edges {
          node {
            name
          }
        }
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        edges {
          node {
            firstName
          }
        }
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        edges {
          node {
            name
          }
        }
      }
    `
  }
});
