import React from 'react';
import Relay from 'react-relay';
import LoadingLarge from 'components/LoadingLarge';

import { isPrewriting } from 'utils';

class HomeView extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    const { viewer } = this.props;
    const novel = viewer.novels.edges[0].node;
    const novelUrl = `/contribute/novel/${novel.id}/`;
    const urlSuffix = isPrewriting(novel) ? 'prewriting/' : `chapter/${novel.latestChapter.id}`;
    this.props.history.replace(novelUrl + urlSuffix);
  }

  render() {
    return (
      <LoadingLarge />
    );
  }
}

export default Relay.createContainer(HomeView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Query {
        novels(first: 1) {
          edges {
            node {
              id
              latestChapter {
                id
              }
              stage {
                name
              }
            }
          }
        }
      }
    `
  }
});
