import React from 'react';
import Relay from 'react-relay';
import Chapter from './Chapter';
import { Tabs, Tab } from 'material-ui';

class Novel extends React.Component {
  static propTypes = {
    novel: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { tabsValue: props.novel.chapter.id };
  }

  _handleChapterChange = (chapterId) => {
    this.setState({tabsValue: chapterId});
  }

  render () {
    const { novel } = this.props;
    return (
      <div>
        <Tabs
          valueLink={{value: this.state.tabsValue,
                      requestChange: this._handleChapterChange.bind(this)}}
          >
          {novel.chapters.edges.map(edge => (
            <Tab key={edge.node.id} label={edge.node.title} value={edge.node.id}>
              <Chapter chapter={edge.node} allowContribute={false} />
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Relay.createContainer(Novel, {
  initialVariables: {
    chapterId: null
  },
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        title
        chapter: latestChapter {
          id
        }
        chapters(last: 4) {
          edges {
            node {
              id
              title
              ${Chapter.getFragment('chapter')}
            }
          }
        }
      }
    `
  }
});
