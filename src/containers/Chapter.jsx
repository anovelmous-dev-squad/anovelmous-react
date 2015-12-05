import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { LinearProgress, AutoComplete } from 'material-ui';
import { getVotingRoundProgress } from 'utils';

const PROGRESS_BAR_UPDATE_INTERVAL = 200; // in ms

const getCharacterFullName = (firstName, lastName) => {
  if (lastName === '') {
    return firstName;
  }
  return `${firstName} ${lastName}`;
};

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
    voteText: PropTypes.string,
    children: PropTypes.element,
  }

  constructor(props) {
    super(props);
    const { chapter, vocabulary, places, characters, plotItems } = this.props;
    const dataSource = {};
    vocabulary.edges.forEach(edge => (
      dataSource[edge.node.content] = this._getAutoCompleteVocabTerm(edge.node)
    ));
    places.edges.forEach(edge => (
      dataSource[edge.node.name] = this._getAutoCompletePlace(edge.node)
    ));
    characters.edges.forEach(edge => (
      dataSource[getCharacterFullName(edge.node.firstName, edge.node.lastName)] = this._getAutoCompleteCharacter(edge.node)
    ));
    plotItems.edges.forEach(edge => (
      dataSource[edge.node.name] = this._getAutoCompletePlotItem(edge.node)
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

  _getAutoCompleteVocabTerm(vocabTerm) {
    return <AutoComplete.Item primaryText={vocabTerm.content} secondaryText="Token" key={vocabTerm.id} />;
  }

  _getAutoCompletePlace(place) {
    return <AutoComplete.Item primaryText={place.name} secondaryText="Place" key={place.id} />;
  }

  _getAutoCompleteCharacter(character) {
    return <AutoComplete.Item primaryText={getCharacterFullName(character.firstName, character.lastName)} secondaryText="Character" key={character.id} />;
  }

  _getAutoCompletePlotItem(plotItem) {
    return <AutoComplete.Item primaryText={plotItem.name} secondaryText="PlotItem" key={plotItem.id} />;
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
      return key.toLowerCase().startsWith(searchText.toLowerCase());
    }
    if (searchText === key.toLowerCase()) {
      return true;
    }
    return false;
  }

  render () {
    const { chapter, readingHeight } = this.props;
    return (
      <div>
        {this.props.children}
        <div style={{height: readingHeight || 500, overflowY: 'scroll'}}>
          <span>{chapter.text} </span>
            {!chapter.isCompleted &&
              <span>
                <AutoComplete
                  dataSource={this.state.dataSource}
                  animated={false}
                  searchText={this.props.voteText}
                  floatingLabelText={'your contribution here'}
                  onUpdateInput={(text) => this.props.onVoteChange(text)}
                  onNewRequest={(e) => {
                    const text = (typeof e === 'string') ? e : e.props.primaryText;
                    const id = this.state.dataSource[text].key;
                    return this.props.onVoteCast(id, text);
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
            id
            content
          }
        }
      }
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        edges {
          node {
            id
            name
          }
        }
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        edges {
          node {
            id
            firstName
            lastName
          }
        }
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        edges {
          node {
            id
            name
          }
        }
      }
    `
  }
});
