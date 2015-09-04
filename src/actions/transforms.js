import { TransformTypes as types } from 'constants';

export function updateBookmark (novel, chapter, ordinal) {
  return {
    type: types.UPDATE_BOOKMARK,
    bookmark: { novel, chapter, ordinal }
  };
}
