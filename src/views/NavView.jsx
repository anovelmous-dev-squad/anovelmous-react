import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgb(152, 152, 152)',
    border: 0,
    borderRadius: 4,
    color: 'rgb(40, 40, 40)',
    padding: 10
  }
};

@Radium
class NavView extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired
  }

  render() {
    const { contributor } = this.props;

    return (
      <div style={styles.base}>
        <ul>
          {contributor.novels.edges.map(edge => (
            <li key={edge.node.id}>{edge.node.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(NavView, {
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        name
        novels(last: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `
  }
});
