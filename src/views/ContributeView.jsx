import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import VoteCaster from 'components/VoteCaster';
import Novel from 'components/Novel';
import Radium from 'radium';
import ThreePartLayout from 'layouts/ThreePartLayout';
import NavView from 'components/NavView';
import VocabularyView from './VocabularyView';
import Progress from 'components/Progress';

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

    renderNavView() {
      return (<NavView contributor={this.props.contributor}/>);
    }

    renderReader() {
      return (
        <div style={styles.base}>
          <Progress percent={30}/>
          <h1>Hello {this.props.contributor.name}!</h1>
          <div>
          {this.props.contributor.novels.edges.map(edge => (
              <Novel key={edge.node.id} novel={edge.node}/>
            ))}
          </div>
          <VoteCaster tokens={this.props.contributor.vocabulary}/>
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
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        name
        novels(last: 1) {
          edges {
            node {
              id
              ${Novel.getFragment('novel')}
            }
          }
        }
        vocabulary(first: 5) {
          edges {
            node {
              id
              content
            }
          }
          ${VoteCaster.getFragment('tokens')}
        }
        ${NavView.getFragment('contributor')}
        ${VocabularyView.getFragment('contributor')}
      }
    `
  }
});
