import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Toolbar, ToolbarGroup, FontIcon, Paper } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

import Novel from './Novel';
import NovelSelect from './NovelSelect';


class Notebook extends React.Component {
  static propTypes = {
    novel: PropTypes.object.isRequired,
    novels: PropTypes.object.isRequired,
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    onNovelChange: PropTypes.func,
    onChapterChange: PropTypes.func,
    onVoteChange: PropTypes.func.isRequired,
    onVoteCast: PropTypes.func.isRequired,
    voteText: PropTypes.string.isRequired,
    children: PropTypes.element
  };

  render() {
    const { novel, novels, vocabulary, places, characters, plotItems,
            onNovelChange, onChapterChange, onVoteChange, onVoteCast, voteText } = this.props;
    return (
      <Paper>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <FontIcon className="material-icons" hoverColor={Colors.red700} color={Colors.red900}>book</FontIcon>
            <NovelSelect
              currentNovel={novel}
              novels={novels}
              onChange={onNovelChange}
              />
          </ToolbarGroup>
        </Toolbar>
        <Novel
          onChapterChange={onChapterChange}
          novel={novel}
          vocabulary={vocabulary}
          places={places}
          characters={characters}
          plotItems={plotItems}
          >
          {this.props.children && React.cloneElement(this.props.children, {
            onVoteChange: onVoteChange,
            onVoteCast: onVoteCast,
            voteText: voteText
          })}
        </Novel>
      </Paper>
    );
  }
}

export default Relay.createContainer(Notebook, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        ${NovelSelect.getFragment('currentNovel')}
        ${Novel.getFragment('novel')}
      }
    `,
    novels: () => Relay.QL`
      fragment on NovelConnection {
        ${NovelSelect.getFragment('novels')}
      }
    `,
    vocabulary: () => Relay.QL`
      fragment on VocabTermConnection {
        ${Novel.getFragment('vocabulary')}
      }
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        ${Novel.getFragment('places')}
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        ${Novel.getFragment('characters')}
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        ${Novel.getFragment('plotItems')}
      }
    `
  }
});
