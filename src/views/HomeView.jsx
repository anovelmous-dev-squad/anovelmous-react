import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import LoadingLarge from 'components/LoadingLarge';

class HomeView extends React.Component {
  componentWillMount() {
    const { viewer } = this.props;
    const novel = viewer.novels.edges[0].node;
    const chapter = novel.latestChapter;
    const contributeUrl = `/contribute/novel/${novel.id}/chapter/${chapter.id}`;
    this.props.history.replace(contributeUrl);
  }

  render() {
    const { viewer } = this.props;
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
            }
          }
        }
      }
    `
  }
});
