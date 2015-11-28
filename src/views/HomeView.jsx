import React from 'react';
import Relay from 'react-relay';
import LoadingLarge from 'components/LoadingLarge';

class HomeView extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    const { viewer } = this.props;
    const novel = viewer.novels.edges[0].node;
    const chapter = novel.latestChapter;
    const contributeUrl = `/contribute/novel/${novel.id}/chapter/${chapter.id}`;
    this.props.history.replace(contributeUrl);
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
            }
          }
        }
      }
    `
  }
});
