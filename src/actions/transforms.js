import { TransformTypes as types } from 'constants';

export function updateBookmark (chapterId, ordinal) {
  return { type: types.UPDATE_BOOKMARK, chapterId, ordinal };
}
