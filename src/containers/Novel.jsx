import React from 'react';
import Relay from 'react-relay';
import { Tabs, Tab } from 'material-ui';
import Chapter from './Chapter';


class Novel extends React.Component {
  static propTypes = {
    onChapterChange: React.PropTypes.func,
    vocabulary: React.PropTypes.object.isRequired,
    places: React.PropTypes.object.isRequired,
    characters: React.PropTypes.object.isRequired,
    plotItems: React.PropTypes.object.isRequired,
    novel: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { tabsValue: props.novel.latestChapter.id };
  }

  _handleChapterChange = (chapterId) => {
    const { onChapterChange } = this.props;
    if (onChapterChange) {
      onChapterChange(chapterId);
    }
    this.setState({tabsValue: chapterId});
  }

  render () {
    const { novel, vocabulary, places, characters, plotItems } = this.props;
    return (
      <div>
        <Tabs
          valueLink={{value: this.state.tabsValue,
                      requestChange: this._handleChapterChange.bind(this)}}
          >
          {novel.chapters.edges.map(edge => (
            <Tab key={edge.node.id} label={edge.node.title} value={edge.node.id}>
              {this.props.children && React.cloneElement(this.props.children, {
                vocabulary,
                places,
                characters,
                plotItems
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
    `,
    places: () => Relay.QL`
      fragment on PlaceConnection {
        ${Chapter.getFragment('places')}
      }
    `,
    characters: () => Relay.QL`
      fragment on CharacterConnection {
        ${Chapter.getFragment('characters')}
      }
    `,
    plotItems: () => Relay.QL`
      fragment on PlotItemConnection {
        ${Chapter.getFragment('plotItems')}
      }
    `
  }
});
