import React from 'react';
import Relay from 'react-relay';
import Chapter from './Chapter';
import Radium from 'radium';
import ChapterSelect from 'containers/ChapterSelect';

@Radium
class Novel extends React.Component {
  static propTypes = {
    novel: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired
  }

  _handleChapterChange = (chapterId) => {
    this.props.relay.setVariables({ chapterId });
  }

  render () {
    const { novel } = this.props;
    const { chapterId } = this.props.relay.variables;
    return (
      <div>
        <ChapterSelect
          onSelect={this._handleChapterChange}
          chapters={novel.chapters}
          currentChapterId={chapterId || novel.chapter.id} />
        <Chapter chapter={novel.chapter} />
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
        chapter(id: $chapterId, mostRecent: true) {
          id
          ${Chapter.getFragment('chapter')}
        }
        chapters(first: 10) {
          ${ChapterSelect.getFragment('chapters')}
        }
      }
    `
  }
});
