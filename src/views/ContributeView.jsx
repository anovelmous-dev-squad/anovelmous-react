import React from 'react';
import Relay from 'react-relay';
import SidebarLayout from 'layouts/SidebarLayout';
import VocabularyView from './VocabularyView';
import CastVoteMutation from 'mutations/CastVoteMutation';
import NovelSelect from 'containers/NovelSelect';
import { Paper } from 'material-ui';


class ContributeView extends React.Component {
    static propTypes = {
      relay: React.PropTypes.object.isRequired,
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
      this.history.goTo(`novel/${novelId}`);
    }

    _handleVoteChange = () => {

    }

    _handleVoteCast = () => {

    }

    renderNotebook() {
      const { viewer } = this.props;
      const latestNovelId = viewer.novels.edges[0].node.id;
      return (
        <Paper>
          <NovelSelect
            currentNovelId={latestNovelId}
            novels={viewer.novels}
            onChange={this._handleNovelChange}
            />
          {this.props.children}
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
        novels(last: 5) {
          edges {
            node {
              id
            }
          }
          ${NovelSelect.getFragment('novels')}
        }
        ${VocabularyView.getFragment('viewer')}
      }
    `
  }
});
