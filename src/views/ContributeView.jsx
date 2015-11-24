import React from 'react';
import Relay from 'react-relay';
import SidebarLayout from 'layouts/SidebarLayout';
import VocabularyView from './VocabularyView';
import CastVoteMutation from 'mutations/CastVoteMutation';
import NovelSelect from 'containers/NovelSelect';
import Novel from 'containers/Novel';
import { Paper } from 'material-ui';


class ContributeView extends React.Component {
    static propTypes = {
      relay: React.PropTypes.object.isRequired,
      history: React.PropTypes.object.isRequired,
      contributor: React.PropTypes.object.isRequired,
      viewer: React.PropTypes.object.isRequired,
      children: React.PropTypes.element.isRequired
    };

    _handleTextInputSave = (token) => {
      const chapter = this.props.viewer.novel.chapter;
      Relay.Store.update(
        new CastVoteMutation({
          tokenId: token.id,
          chapterId: chapter.id,
          ordinal: chapter.tokens.totalCount,
          viewer: this.props.contributor
        })
      );
    }

    _handleNovelChange = (novelId) => {
      const novel = this.props.viewer.novels.edges.filter(edge => edge.node.id === novelId)[0].node;
      const chapterId = novel.latestChapter.id;
      const novelContributeUrl = `/contribute/novel/${novelId}/chapter/${chapterId}`;
      this.props.history.replaceState({'allowContribute': true}, novelContributeUrl);
    }

    _handleVoteChange = () => {

    }

    _handleVoteCast = () => {

    }

    renderNotebook() {
      const { viewer } = this.props;
      return (
        <Paper>
          <NovelSelect
            currentNovelId={viewer.novel.id}
            novels={viewer.novels}
            onChange={this._handleNovelChange}
            />
          <Novel novel={viewer.novel}>
            {this.props.children}
          </Novel>
        </Paper>
      );
    }

    renderVocabularyView() {
      return (<VocabularyView viewer={this.props.viewer}/>);
    }

    render () {
      return (
        <SidebarLayout
          content={this.renderNotebook()}
          sidebar={this.renderVocabularyView()}
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
          ${Novel.getFragment('novel')}
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
        ${VocabularyView.getFragment('viewer')}
      }
    `
  }
});
