import { default as paginate } from './paginate'
import { merge } from 'lodash';
import * as ActionTypes from 'actions';
import { combineReducers } from 'redux';

function bookmark (state = {
  novel: '',
  chapter: '',
  ordinal: 0
}, action) {
  const { type } = action;

  if (type === ActionTypes.NOVEL_SUCCESS) {// TODO: diff action types req
    return merge({}, state, { novel: action.response.result });
  } else if (type === ActionTypes.CHAPTER_SUCCESS) {
    return merge({}, state, { chapter: action.response.result });
  }

  return state;
}

// Updates an entity cache in response to any action with response.entities.
function entities (state = {
  contributors: {},
  guilds: {},
  novels: {},
  chapters: {},
  novelTokens: {},
  formattedNovelTokens: {},
  tokens: {},
  votes: {}
}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

const pagination = combineReducers({
  novelsByContributor: paginate({
    mapActionToKey: action => action.contributor.clientId,
    types: [
      ActionTypes.NOVELS_REQUEST,
      ActionTypes.NOVELS_SUCCESS,
      ActionTypes.NOVELS_FAILURE
    ]
  }),
  chaptersByNovel: paginate({
    mapActionToKey: action => action.novel.clientId,
    types: [
      ActionTypes.CHAPTERS_REQUEST,
      ActionTypes.CHAPTERS_SUCCESS,
      ActionTypes.CHAPTERS_FAILURE
    ]
  }),
  formattedTokensByChapter: paginate({
    mapActionToKey: action => action.chapter.clientId,
    types: [
      ActionTypes.FORMATTED_NOVEL_TOKENS_REQUEST,
      ActionTypes.FORMATTED_NOVEL_TOKENS_SUCCESS,
      ActionTypes.FORMATTED_NOVEL_TOKENS_FAILURE
    ]
  })
});

// Updates error message to notify about the failed fetches.
function errorMessage (state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

const rootReducer = combineReducers({
  bookmark,
  entities,
  pagination,
  errorMessage
});

export default rootReducer;
