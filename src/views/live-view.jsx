import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadNovels, loadChapters, loadFormattedNovelTokens,
         updateBookmark, loadGrammarFilteredTokens } from 'actions';
import VoteCaster from 'components/vote-caster';
import Immutable from 'immutable';

const CONTRIBUTOR = { clientId: '8d12c47c-8167-4df6-a5cc-def15cb3e4d8' };
const CHAPTER_ID = '6dfe0d41-e7fd-4728-b392-82bf1cf12422';

function isEmpty (obj) {
  return Object.keys(obj).length === 0;
}

function getNovelId (state) {
  const { novelsByContributor } = state.pagination;
  const pages = novelsByContributor[CONTRIBUTOR.clientId];

  return typeof pages !== 'undefined' ? pages.ids[0] : pages;
}

@connect(state => ({
  entities: state.entities,
  bookmark: state.bookmark,
  pagination: state.pagination
}), { loadNovels, loadChapters, loadFormattedNovelTokens,
      updateBookmark, loadGrammarFilteredTokens })
export default class LiveView extends React.Component {
    static propTypes = {
      loadNovels: PropTypes.func.isRequired,
      loadChapters: PropTypes.func.isRequired,
      loadFormattedNovelTokens: PropTypes.func.isRequired,
      loadGrammarFilteredTokens: PropTypes.func.isRequired,
      updateBookmark: PropTypes.func.isRequired,
      entities: PropTypes.object.isRequired
    };

    componentWillMount () {
      this.props.loadNovels(CONTRIBUTOR);
      this.props.loadGrammarFilteredTokens();
    }

    componentWillReceiveProps (nextProps) {
      const {
        entities: { novels, chapters, formattedNovelTokens },
        pagination: {
          novelsByContributor, chaptersByNovel, formattedTokensByChapter
        }
      } = nextProps;

      const novelId = getNovelId(nextProps);
      const isFetchingChapters = chaptersByNovel[novelId]
                                 && chaptersByNovel[novelId].isFetching;

      const requestChapters = !isFetchingChapters
                              && isEmpty(chapters)
                              && !isEmpty(novels);

      const isFetchingText = formattedTokensByChapter[CHAPTER_ID]
                             && formattedTokensByChapter[CHAPTER_ID].isFetching;

      const requestChapterText = !isFetchingText
                                 && isEmpty(formattedNovelTokens)
                                 && !isEmpty(chapters);

      if (requestChapters) {
        this.props.loadChapters(novels[novelId]);
      }

      if (requestChapterText) {
        this.props.loadFormattedNovelTokens(chapters[CHAPTER_ID]);
      }
    }

    _handleBookmarkUpdate = () => {
      const { pagination: { chaptersByNovel } } = this.props;
      const novelId = getNovelId(this.props);

      this.props.updateBookmark(novelId,
        chaptersByNovel[novelId].ids[0], 0);
    }

    render () {
      const {
        entities: { novels, chapters, formattedNovelTokens, tokens }
      } = this.props;
      const novel = novels[getNovelId(this.props)];
      const novelTitle = novel ? novel.title : 'Loading...';

      const novelTokensByOrdinal = Immutable.fromJS(formattedNovelTokens,
        (k, v) => {
          const isIndexed = Immutable.Iterable.isIndexed(v.ordinal);

          return isIndexed ? v.toList() : v.toOrderedMap();
        });
      const tokenList = Object.keys(tokens).map(key => tokens[key]);

      return (
        <div>
          <button onClick={this._handleBookmarkUpdate}>Update bookmark</button>
          <p>Currently reading: {novelTitle}</p>
          <p>{novelTokensByOrdinal.map(token => token.get('content') + ' ')}</p>
          <VoteCaster tokens={tokenList}/>
        </div>
      );
    }
}
