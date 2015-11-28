import React from 'react';
import Relay from 'react-relay';
import { Tabs, Tab } from 'material-ui';
import Chapter from './Chapter';


class Novel extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    vocabulary: React.PropTypes.object.isRequired,
    novel: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { tabsValue: props.novel.latestChapter.id };
  }

  _handleChapterChange = (chapterId) => {
    const { novel } = this.props;
    const novelId = novel.id;
    const chapter = novel.chapters.edges.filter(edge => edge.node.id === chapterId)[0].node;
    const newState = { allowContribute: !chapter.isCompleted };
    this.props.history.replaceState(newState, `/contribute/novel/${novelId}/chapter/${chapterId}`);
    this.setState({tabsValue: chapterId});
  }

  render () {
    const { novel, vocabulary } = this.props;
    return (
      <div>
        <Tabs
          valueLink={{value: this.state.tabsValue,
                      requestChange: this._handleChapterChange.bind(this)}}
          >
          {novel.chapters.edges.map(edge => (
            <Tab key={edge.node.id} label={edge.node.title} value={edge.node.id}>
              {this.props.children && React.cloneElement(this.props.children, {
                vocabulary
              })}
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Relay.createContainer(Novel, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        title
        latestChapter {
          id
        }
        chapters(last: 4) {
          edges {
            node {
              id
              title
              isCompleted
            }
          }
        }
      }
    `,
    vocabulary: () => Relay.QL`
      fragment on VocabTermConnection {
        ${Chapter.getFragment('vocabulary')}
      }
    `
  }
});
