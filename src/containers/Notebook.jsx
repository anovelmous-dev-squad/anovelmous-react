import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Toolbar, ToolbarGroup, FontIcon, Paper, IconButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import { Link } from 'react-router';

import Novel from './Novel';
import NovelSelect from './NovelSelect';
import { isPrewriting } from 'utils';


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

  constructor(props) {
    super(props);
    this.state = { chapterId: props.novel.latestChapter.id };
  }

  render() {
    const { novel, novels, vocabulary, places, characters, plotItems,
            onNovelChange, onChapterChange, onVoteChange, onVoteCast, voteText } = this.props;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <FontIcon className="material-icons" hoverColor={Colors.red700} color={Colors.red900}>book</FontIcon>
            <NovelSelect
              currentNovel={novel}
              novels={novels}
              onChange={onNovelChange}
              />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            {!isPrewriting(novel) &&
              <Link to={`/contribute/novel/${novel.id}/chapter/${this.state.chapterId}/plot/`}>
                <IconButton tooltip="Plot">
                  <FontIcon
                    className="material-icons"
                    hoverColor={Colors.red700}
                    color={Colors.red900}>
                    description
                  </FontIcon>
                </IconButton>
              </Link>
            }
          </ToolbarGroup>
        </Toolbar>
        {novel.stage.name === 'WRITING' || novel.stage.name === 'FINISHED' ? (
          <Novel
            onChapterChange={(chapterId) => {
              this.setState({chapterId});
              onChapterChange(chapterId);
            }}
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
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

export default Relay.createContainer(Notebook, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        latestChapter {
          id
        }
        stage {
          name
        }
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
