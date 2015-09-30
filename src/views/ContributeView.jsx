import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import VoteCaster from 'components/VoteCaster';
import Radium from 'radium';
import ThreePartLayout from 'layouts/ThreePartLayout';
import NavView from './NavView';
import VocabularyView from './VocabularyView';
import Progress from 'components/Progress';
import Novel from 'components/Novel';
import { getVotingRoundProgress } from 'utils';

const PROGRESS_BAR_UPDATE_INTERVAL = 2000; // in ms

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
      contributor: PropTypes.object.isRequired
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

    renderNavView() {
      return (<NavView contributor={this.props.contributor}/>);
    }

    renderReader() {
      const { contributor } = this.props;
      return (
        <div style={styles.base}>
          <Progress percent={this.state.votingRoundProgress.percentComplete}
                    transition={PROGRESS_BAR_UPDATE_INTERVAL}
                    height={20}
                    >
            <p>{this.state.votingRoundProgress.secondsRemaining} Seconds Left</p>
          </Progress>
          <Novel novel={contributor.novel}/>
          <VoteCaster tokens={contributor.vocabulary}/>
        </div>
      );
    }

    renderVocabularyView() {
      return (<VocabularyView contributor={this.props.contributor}/>);
    }

    render () {
      return (
        <ThreePartLayout
          leftSidebar={this.renderNavView()}
          middleContent={this.renderReader()}
          rightSidebar={this.renderVocabularyView()}
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
          chapter(mostRecent: true) {
            prevVotingEndedAt
            votingDuration
          }
          ${Novel.getFragment('novel')}
        }
        vocabulary(first: 5) {
          ${VoteCaster.getFragment('tokens')}
        }
        ${NavView.getFragment('contributor')}
        ${VocabularyView.getFragment('contributor')}
      }
    `
  }
});
