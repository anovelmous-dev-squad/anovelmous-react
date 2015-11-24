import React from 'react';
import Relay from 'react-relay';
import SidebarLayout from 'layouts/SidebarLayout';
import VocabularyView from './VocabularyView';
import { getVotingRoundProgress } from 'utils';
import CastVoteMutation from 'mutations/CastVoteMutation';
import Notebook from 'containers/Notebook';
import { LinearProgress, Paper } from 'material-ui';

const PROGRESS_BAR_UPDATE_INTERVAL = 200; // in ms

class ContributeView extends React.Component {
    static propTypes = {
      contributor: React.PropTypes.object.isRequired,
      viewer: React.PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      const { novel } = props.viewer;
      const { chapter } = novel;
      this.state = {
        votingRoundProgress: getVotingRoundProgress(
          novel.prevVotingEnded, chapter.votingDuration
        )
      };
    }

    componentDidMount() {
      this._updateVotingRoundProgress();
    }

    _updateVotingRoundProgress() {
      const self = this;
      setInterval(() => {
        const chapter = self.props.viewer.novel.chapter;
        self.setState({
          votingRoundProgress: getVotingRoundProgress(
            chapter.prevVotingEndedAt, chapter.votingDuration
          )
        });
      }, PROGRESS_BAR_UPDATE_INTERVAL);
    }

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
      console.log(novelId);
    }

    _handleVoteChange = () => {

    }

    _handleVoteCast = () => {

    }

    renderNotebook() {
      const { viewer } = this.props;
      return (
        <Paper>
          <Notebook
            novel={viewer.novel}
            novels={viewer.novels}
            onNovelChange={this._handleNovelChange}
            onVoteChange={this._handleVoteChange}
            onVoteCast={this._handleVoteCast}
            />
          <LinearProgress
            mode="determinate"
            value={this.state.votingRoundProgress.percentComplete} />
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
          prevVotingEnded
          chapter: latestChapter {
            id
            votingDuration
            tokens(first: 1) {
              totalCount
            }
          }
          ${Notebook.getFragment('novel')}
        }
        novels(first: 5) {
          ${Notebook.getFragment('novels')}
        }
        ${VocabularyView.getFragment('viewer')}
      }
    `
  }
});
