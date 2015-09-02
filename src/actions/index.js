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

function fetchNovels (queryParams, url = '') {
  return {
    [CALL_API]: {
      types: [],
      endpoints: url ? url : 'novels/',
      schema: Schemas.NOVEL_ARRAY,
      queryParams: queryParams
    }
  };
}

export function loadNovels (queryParams, url = '') {
  return (dispatch, getState) => {
    return dispatch(fetchNovels(queryParams, url));
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

function fetchChapters (queryParams, url = '') {
  return {
    [CALL_API]: {
      types: [CHAPTERS_REQUEST, CHAPTERS_SUCCESS, CHAPTERS_FAILURE],
      endpoint: url ? url : 'chapters/',
      schema: Schemas.CHAPTER_ARRAY,
      queryParams: queryParams
    }
  };
}

export const CHAPTER_TEXT_REQUEST = 'CHAPTER_TEXT_REQUEST';
export const CHAPTER_TEXT_SUCCESS = 'CHAPTER_TEXT_SUCCESS';
export const CHAPTER_TEXT_FAILURE = 'CHAPTER_TEXT_FAILURE';

function fetchChapterText (queryParams, url = '') {
  return {
    [CALL_API]: {
      types: [CHAPTER_TEXT_REQUEST, CHAPTER_TEXT_SUCCESS, CHAPTER_TEXT_FAILURE],
      endpoint: url ? url : 'formatted_novel_tokens/',
      schema: Schemas.CHAPTER_TEXT_ARRAY,
      queryParams: queryParams
    }
  };
}
