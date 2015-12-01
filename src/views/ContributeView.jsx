import React from 'react';
import Relay from 'react-relay';
import FullContentLayout from 'layouts/FullContentLayout';
import SidebarLayout from 'layouts/SidebarLayout';
import CardVoter from 'containers/CardVoter';
import CastVoteMutation from 'mutations/CastVoteMutation';
import NovelSelect from 'containers/NovelSelect';
import Novel from 'containers/Novel';
import { Paper, FontIcon, Toolbar, ToolbarGroup, Snackbar } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

class ContributeView extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
    contributor: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      voteText: '',
      prevVoteText: ''
    };
  }

  _handleNovelChange = (novelId) => {
    const novel = this.props.viewer.novels.edges.filter(edge => edge.node.id === novelId)[0].node;
    const chapterId = novel.latestChapter.id;
    const novelContributeUrl = `/contribute/novel/${novelId}/chapter/${chapterId}`;
    this.props.history.replace(novelContributeUrl);
  }

  _handleVoteChange = (voteText) => {
    this.setState({voteText});
  }

  _handleVoteCast = (resourceId, text) => {
    this.setState({voteText: '', prevVoteText: text});
    const chapter = this.props.viewer.novel.latestChapter;
    Relay.Store.update(
      new CastVoteMutation({
        resourceId,
        chapter,
        ordinal: chapter.tokens.totalCount,
        contributor: this.props.contributor
      })
    );
    this.refs.votingSnackbar.show();
  }

  renderNotebook() {
    const { viewer, history } = this.props;
    return (
      <Paper>
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <FontIcon className="material-icons" hoverColor={Colors.red700} color={Colors.red900}>book</FontIcon>
            <NovelSelect
              currentNovelId={viewer.novel.id}
              novels={viewer.novels}
              onChange={this._handleNovelChange}
              />
          </ToolbarGroup>
        </Toolbar>
        <Novel
          history={history}
          novel={viewer.novel}
          vocabulary={viewer.novel.vocabulary}
          places={viewer.novel.places}
          characters={viewer.novel.characters}
          plotItems={viewer.novel.plotItems}
          >
          {this.props.children && React.cloneElement(this.props.children, {
            onVoteChange: this._handleVoteChange,
            onVoteCast: this._handleVoteCast,
            voteText: this.state.voteText
          })}
        </Novel>
      </Paper>
    );
  }

  renderCardVoter() {
    const { viewer } = this.props;
    return (
      <div>
      <CardVoter
        voteText={this.state.voteText}
        vocabulary={viewer.novel.vocabulary}
        places={viewer.novel.places}
        characters={viewer.novel.characters}
        plotItems={viewer.novel.plotItems}
        onVoteCast={this._handleVoteCast}
        />
      <Snackbar
        ref="votingSnackbar"
        message={`You voted for ${this.state.prevVoteText}!`}
        autoHideDuration={2000}
        />
    </div>
    );
  }

  render () {
    return (this.props.viewer.novel.isCompleted) ? (
      <FullContentLayout
        content={this.renderNotebook()}
        />
    ) : (
      <SidebarLayout
        content={this.renderNotebook()}
        sidebar={this.renderCardVoter()}
        />
    );
  }
}

export default Relay.createContainer(ContributeView, {
  initialVariables: {
    novelId: null
  },
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        votes(first: 5) {
          edges {
            node {
              token
            }
          }
        }
        ${CastVoteMutation.getFragment('contributor')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on Query {
        novel(id: $novelId) {
          id
          isCompleted
          latestChapter {
            id
            tokens {
              totalCount
            }
            ${CastVoteMutation.getFragment('chapter')}
          }
          ${Novel.getFragment('novel')}
          vocabulary(first: 10000) {
            ${Novel.getFragment('vocabulary')}
            ${CardVoter.getFragment('vocabulary')}
          }
          places(first: 50) {
            ${Novel.getFragment('places')}
            ${CardVoter.getFragment('places')}
          }
          characters(first: 50) {
            ${Novel.getFragment('characters')}
            ${CardVoter.getFragment('characters')}
          }
          plotItems(first: 50) {
            ${Novel.getFragment('plotItems')}
            ${CardVoter.getFragment('plotItems')}
          }
        }
        novels(last: 5) {
          edges {
            node {
              id
              latestChapter {
                id
              }
            }
          }
          ${NovelSelect.getFragment('novels')}
        }
      }
    `
  }
});
