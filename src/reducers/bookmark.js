import { TransformTypes as types } from 'constants';
import { merge } from 'lodash';

export default function bookmark (state = {
  novel: '',
  chapter: '',
  ordinal: 0
}, action) {
  switch (action.type) {
    case types.UPDATE_BOOKMARK:
      return merge({}, state, action.bookmark);
    default:
      return state;
  }
}
