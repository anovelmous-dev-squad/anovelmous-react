import { CALL_API, Schemas } from '../middleware/api';

export const NOVEL_REQUEST = 'NOVEL_REQUEST';
export const NOVEL_SUCCESS = 'NOVEL_SUCCESS';
export const NOVEL_FAILURE = 'NOVEL_FAILURE';

function fetchNovel (id) {
  return {
    [CALL_API]: {
      types: [NOVEL_REQUEST, NOVEL_SUCCESS, NOVEL_FAILURE],
      endpoint: `novels/${id}/`,
      schema: Schemas.NOVEL
    }
  };
}

export function loadNovel (id) {
  return (dispatch, getState) => {
    return dispatch(fetchNovel(id));
  };
}

export const NOVELS_REQUEST = 'NOVELS_REQUEST';
export const NOVELS_SUCCESS = 'NOVELS_SUCCESS';
export const NOVELS_FAILURE = 'NOVELS_FAILURE';

function fetchNovels (contributor, nextPageUrl) {
  return {
    contributor,
    [CALL_API]: {
      types: [NOVELS_REQUEST, NOVELS_SUCCESS, NOVELS_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.NOVEL_ARRAY
    }
  };
}

export function loadNovels (contributor, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = 'novels/',
      pageCount = 0
    } = getState().pagination.novelsByContributor[contributor] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchNovels(contributor, nextPageUrl));
  }
}

export const CHAPTER_REQUEST = 'CHAPTER_REQUEST';
export const CHAPTER_SUCCESS = 'CHAPTER_SUCCESS';
export const CHAPTER_FAILURE = 'CHAPTER_FAILURE';

function fetchChapter (id, url = '') {
  return {
    [CALL_API]: {
      types: [CHAPTER_REQUEST, CHAPTER_SUCCESS, CHAPTER_FAILURE],
      endpoint: url ? url : `chapters/${id}/`,
      schema: Schemas.CHAPTER
    }
  };
}

export function loadChapter (id) {
  return (dispatch, getState) => {
    return dispatch(fetchChapter(id));
  };
}

export const CHAPTERS_REQUEST = 'CHAPTERS_REQUEST';
export const CHAPTERS_SUCCESS = 'CHAPTERS_SUCCESS';
export const CHAPTERS_FAILURE = 'CHAPTERS_FAILURE';

function fetchChapters (novel, nextPageUrl) {
  return {
    novel,
    [CALL_API]: {
      types: [CHAPTERS_REQUEST, CHAPTERS_SUCCESS, CHAPTERS_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.CHAPTER_ARRAY
    }
  };
}

export function loadChapters (novel, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = novel.chapters,
      pageCount = 0
    } = getState().pagination.chaptersByNovel[novel.clientId] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchChapters(novel, nextPageUrl));
  };
}

export const FORMATTED_NOVEL_TOKENS_REQUEST = 'FORMATTED_NOVEL_TOKENS_REQUEST';
export const FORMATTED_NOVEL_TOKENS_SUCCESS = 'FORMATTED_NOVEL_TOKENS_SUCCESS';
export const FORMATTED_NOVEL_TOKENS_FAILURE = 'FORMATTED_NOVEL_TOKENS_FAILURE';

function fetchFormattedNovelTokens (chapter, nextPageUrl) {
  return {
    chapter,
    [CALL_API]: {
      types: [
        FORMATTED_NOVEL_TOKENS_REQUEST,
        FORMATTED_NOVEL_TOKENS_SUCCESS,
        FORMATTED_NOVEL_TOKENS_FAILURE
      ],
      endpoint: nextPageUrl,
      schema: Schemas.FORMATTED_NOVEL_TOKEN_ARRAY
    }
  };
}

export function loadFormattedNovelTokens (chapter, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = chapter.formattedNovelTokens,
      pageCount = 0
    } = getState().pagination.formattedTokensByChapter[chapter.clientId] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchFormattedNovelTokens(chapter, nextPageUrl));
  };
}


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: RESET_ERROR_MESSAGE
  };
}
