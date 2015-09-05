import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadNovel, loadChapters, loadFormattedNovelTokens,
         updateBookmark } from 'actions';
import Immutable from 'immutable';

const NOVEL_ID = 'f2d1c3b5-b9d7-4e4d-a8ea-3d0bb9a26780';
const CHAPTER_ID = '6dfe0d41-e7fd-4728-b392-82bf1cf12422';

function isEmpty (obj) {
  return Object.keys(obj).length === 0;
}

@connect(state => ({
  entities: state.entities,
  bookmark: state.bookmark,
  pagination: state.pagination
}), { loadNovel, loadChapters, loadFormattedNovelTokens, updateBookmark })
export default class LiveView extends React.Component {
    static propTypes = {
      loadNovel: PropTypes.func.isRequired,
      loadChapters: PropTypes.func.isRequired,
      loadFormattedNovelTokens: PropTypes.func.isRequired,
      updateBookmark: PropTypes.func.isRequired,
      entities: PropTypes.object.isRequired
    };

    constructor () {
      super();
    }

    componentWillMount () {
      this.props.loadNovel(NOVEL_ID);
    }

    componentWillReceiveProps (nextProps) {
      const {
        entities: { novels, chapters, formattedNovelTokens },
        pagination: {
          novelsByContributor, chaptersByNovel, formattedTokensByChapter
        }
      } = nextProps;

      const isFetchingChapters = chaptersByNovel[NOVEL_ID]
                                 && chaptersByNovel[NOVEL_ID].isFetching;

      const requestChapters = !isFetchingChapters
                              && isEmpty(chapters)
                              && !isEmpty(novels);

      const isFetchingText = formattedTokensByChapter[CHAPTER_ID]
                             && formattedTokensByChapter[CHAPTER_ID].isFetching;
      const requestChapterText = !isFetchingText
                                 && isEmpty(formattedNovelTokens)
                                 && !isEmpty(chapters);

      console.log('requestChapters: ' + requestChapters)
      console.log('requestText: ' + requestChapterText)

      if (requestChapters) {
        this.props.loadChapters(novels[NOVEL_ID]);
      }

      /* if (requestChapterText) {
        this.props.loadFormattedNovelTokens(chapters[CHAPTER_ID]);
      }*/
    }

    handleBookmarkUpdate = () => {
      const { pagination: { chaptersByNovel } } = this.props;

      this.props.updateBookmark(NOVEL_ID,
        chaptersByNovel[NOVEL_ID].ids[0], 0);
    }

    handleText = () => {
      this.props.loadFormattedNovelTokens(
        this.props.entities.chapters[CHAPTER_ID]);
    }

    render () {
      const {
        entities: { novels, chapters, formattedNovelTokens }
      } = this.props;
      const novel = novels[NOVEL_ID];
      const novelTitle = novel ? novel.title : 'Loading...';

      const sortedTokens = Immutable.fromJS(formattedNovelTokens, (k, v) => {
        var isIndexed = Immutable.Iterable.isIndexed(v.ordinal);

        return isIndexed ? v.toList() : v.toOrderedMap();
      });

      return (
        <div>
          <button onClick={this.handleText}>Load text</button>
          <button onClick={this.handleBookmarkUpdate}>Update bookmark</button>
          <p>Currently reading: {novelTitle}</p>
          <p>{sortedTokens.map(token => token.get('content') + ' ')}</p>
        </div>
      );
    }
}
