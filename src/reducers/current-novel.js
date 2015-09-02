import { createReducer } from 'utils';
import { merge } from 'lodash';
import * as ActionTypes from 'actions';

const initialState = { novels: {}, chapters: {}, chapterText: {} };

export default createReducer(initialState, {
  [ActionTypes.NOVEL_SUCCESS] : (state, response) => {
    if (response && response.entities) {
      return merge({}, state, response.entities);
    }
    return state;
  },

  [ActionTypes.CHAPTER_SUCCESS] : (state, response) => {
    if (response && response.entities) {
      return merge({}, state, response.entities);
    }
    return state;
  }
});
