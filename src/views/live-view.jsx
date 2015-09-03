import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadNovel, loadChapters, loadChapterText } from 'actions';

const NOVEL_ID = 'f2d1c3b5-b9d7-4e4d-a8ea-3d0bb9a26780';

function isEmpty (obj) {
  return Object.keys(obj).length === 0;
}

@connect(state => ({
  entities: state.entities,
  bookmark: state.bookmark,
  novelLoaded: state.bookmark.novel === NOVEL_ID,
  chaptersLoaded: !isEmpty(state.entities.chapters),
  chapterTextLoaded: !isEmpty(state.entities.formattedNovelTokens)
}), { loadNovel, loadChapters, loadChapterText })
export default class LiveView extends React.Component {
    static propTypes = {
      loadNovel: PropTypes.func.isRequired,
      entities: PropTypes.object.isRequired,
      novelLoaded: PropTypes.bool.isRequired,
      chaptersLoaded: PropTypes.bool.isRequired,
      chapterTextLoaded: PropTypes.bool.isRequired
    };

    constructor () {
      super();
    }

    componentWillMount () {
      this.props.loadNovel(NOVEL_ID);
    }

    componentWillUpdate (nextProps, nextState) {
      const { novelLoaded, chaptersLoaded,
              chapterTextLoaded, entities } = nextProps;
      const { novels, chapters, chapterText } = entities;

      /* if (!chaptersLoaded) {
        this.props.loadChapters(null, novels[NOVEL_ID].chapters);
      } else if (!chapterTextLoaded) {

        // this.props.loadChapterText();

      }*/
    }

    handleLoadChapters = () => {
      const { entities: { novels } } = this.props;

      this.props.loadChapters(novels[NOVEL_ID]);
    }

    render () {
      const { entities: { novels, chapters, chapterText } } = this.props;
      const novel = novels[NOVEL_ID];
      const novelTitle = novel ? novel.title : 'Loading...';

      return (
        <div>
          <p>Currently reading: {novelTitle}</p>
          <button onClick={this.handleLoadChapters}></button>
        </div>
      );
    }
}
