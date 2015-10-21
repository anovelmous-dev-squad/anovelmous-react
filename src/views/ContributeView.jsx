import React from 'react';
import Relay from 'react-relay';
import VoteCaster from 'components/VoteCaster';
import Radium from 'radium';
import SidebarLayout from 'layouts/SidebarLayout';
import VocabularyView from './VocabularyView';
import Novel from 'components/Novel';
import { getVotingRoundProgress } from 'utils';
import CastVoteMutation from 'mutations/CastVoteMutation';
import NovelSelect from 'containers/NovelSelect';
import { LinearProgress, Card, CardHeader, CardText } from 'material-ui';

const PROGRESS_BAR_UPDATE_INTERVAL = 200; // in ms

const styles = {
  base: {
    background: 'rgb(204, 193, 155)',
    border: 0,
    borderRadius: 4
  }
};

@Radium
class ContributeView extends React.Component {
    static propTypes = {
      contributor: React.PropTypes.object.isRequired
    };

    constructor(props) {
      super(props);
      const chapter = props.contributor.novel.chapter;
      this.state = {
        votingRoundProgress: getVotingRoundProgress(
          chapter.prevVotingEndedAt, chapter.votingDuration
        )
      };
    }

    componentDidMount() {
      this._updateVotingRoundProgress();
    }

    _updateVotingRoundProgress() {
      const self = this;
      setInterval(() => {
        const chapter = self.props.contributor.novel.chapter;
        self.setState({
          votingRoundProgress: getVotingRoundProgress(
            chapter.prevVotingEndedAt, chapter.votingDuration
          )
        });
      }, PROGRESS_BAR_UPDATE_INTERVAL);
    }

    _handleTextInputSave = (token) => {
      const chapter = this.props.contributor.novel.chapter;
      Relay.Store.update(
        new CastVoteMutation({
          tokenId: token.id,
          chapterId: chapter.id,
          ordinal: chapter.tokenCount,
          viewer: this.props.contributor
        })
      );
    }

    _handleNovelChange = (novelId) => {
      console.log(novelId)
    }

    renderReader() {
      const { contributor } = this.props;
      return (
        <Card>
          <CardHeader>
            <NovelSelect
              currentNovelId={contributor.novel.id}
              novels={contributor.novels}
              onChange={this._handleNovelChange}
            />
          </CardHeader>
          <CardText>
            <LinearProgress mode="determinate"
                            value={this.state.votingRoundProgress.percentComplete} />
            <Novel novel={contributor.novel}/>
            <VoteCaster tokens={contributor.vocabulary}
                        onSave={this._handleTextInputSave}/>
          </CardText>
        </Card>
      );
    }

    renderVocabularyView() {
      return (<VocabularyView contributor={this.props.contributor}/>);
    }

    render () {
      return (
        <SidebarLayout
          content={this.renderReader()}
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
        name
        novel(id: $novelId) {
          id
          chapter(mostRecent: true) {
            id
            prevVotingEndedAt
            votingDuration
            tokenCount
          }
          ${Novel.getFragment('novel')}
        }
        novels(first: 5) {
          ${NovelSelect.getFragment('novels')}
        }
        vocabulary(first: 5) {
          ${VoteCaster.getFragment('tokens')}
        }
        votes(first: 5) {
          edges {
            node {
              token
            }
          }
        }
        ${VocabularyView.getFragment('contributor')}
        ${CastVoteMutation.getFragment('viewer')}
      }
    `
  }
});
