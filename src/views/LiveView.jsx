import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import VoteCaster from 'components/VoteCaster';
import Novel from 'components/Novel';
import NavPanel from 'components/NavPanel';
import { Grid, Row, Cell } from 'react-inline-grid';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgb(204, 193, 155)',
    border: 0,
    borderRadius: 4
  }
};

@Radium
class LiveView extends React.Component {
    static propTypes = {
      contributor: PropTypes.object.isRequired
    };

    render () {
      const { contributor } = this.props;
      return (
        <Grid>
          <Row is="around tablet-start phone-start">
            <Cell is="2 tablet-2 phone-1">
              <NavPanel contributor={contributor}/>
            </Cell>
            <Cell is="4 tablet-4 phone-4">
              <div style={styles.base}>
                <h1>Hello {contributor.name}!</h1>
                  {contributor.novels.edges.map(edge => (
                    <Novel key={edge.node.id} novel={edge.node}/>
                  ))}
              <VoteCaster tokens={contributor.vocabulary}/>
              </div>
            </Cell>
            <Cell is="2 tablet-2 phone-4">
              <div style={{background: 'rgb(245, 243, 223)'}}>
                <h2>sup</h2>
              </div>
            </Cell>
          </Row>
        </Grid>
      );
    }
}

export default Relay.createContainer(LiveView, {
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
        ${NavPanel.getFragment('contributor')}
      }
    `
  }
});
