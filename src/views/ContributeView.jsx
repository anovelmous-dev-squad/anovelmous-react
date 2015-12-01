import React from 'react';
import Relay from 'react-relay';
import FullContentLayout from 'layouts/FullContentLayout';
import SidebarLayout from 'layouts/SidebarLayout';
import CardVoter from 'containers/CardVoter';
import CastVoteMutation from 'mutations/CastVoteMutation';
import { Snackbar } from 'material-ui';
import Notebook from 'containers/Notebook';
import PrewritingView from './PrewritingView';

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

  _handleChapterChange = (chapterId) => {
    const novelId = this.props.viewer.novel.id;
    this.props.history.replace(`/contribute/novel/${novelId}/chapter/${chapterId}`);
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
    const { viewer } = this.props;
    return (
      <Notebook
        novel={viewer.novel}
        novels={viewer.novels}
        vocabulary={viewer.novel.vocabulary}
        places={viewer.novel.places}
        characters={viewer.novel.characters}
        plotItems={viewer.novel.plotItems}
        onNovelChange={this._handleNovelChange}
        onChapterChange={this._handleChapterChange}
        onVoteChange={this._handleVoteChange}
        onVoteCast={this._handleVoteCast}
        voteText={this.state.voteText}
        >
        {this.props.children}
      </Notebook>
    );
  }

  renderNovelWorkspace(stage) {
    const { contributor, viewer } = this.props;
    if (stage.name === 'WRITING' || stage.name === 'FINISHED') {
      return this.renderNotebook();
    }

    return (
      <PrewritingView
        contributor={contributor}
        viewer={viewer}
        />
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
    const stage = this.props.viewer.novel.stage;
    return (stage.name === 'WRITING') ? (
      <SidebarLayout
        content={this.renderNovelWorkspace(stage)}
        sidebar={this.renderCardVoter()}
        />
    ) : (
      <FullContentLayout
        content={this.renderNovelWorkspace()}
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
        ${PrewritingView.getFragment('contributor')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on Query {
        novel(id: $novelId) {
          id
          stage {
            name
          }
          latestChapter {
            id
            tokens {
              totalCount
            }
            ${CastVoteMutation.getFragment('chapter')}
          }
          vocabulary(first: 10000) {
            ${Notebook.getFragment('vocabulary')}
            ${CardVoter.getFragment('vocabulary')}
          }
          places(first: 50) {
            ${Notebook.getFragment('places')}
            ${CardVoter.getFragment('places')}
          }
          characters(first: 50) {
            ${Notebook.getFragment('characters')}
            ${CardVoter.getFragment('characters')}
          }
          plotItems(first: 50) {
            ${Notebook.getFragment('plotItems')}
            ${CardVoter.getFragment('plotItems')}
          }
          ${Notebook.getFragment('novel')}
          ${PrewritingView.getFragment('novel')}
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
          ${Notebook.getFragment('novels')}
        }
      }
    `
  }
});
