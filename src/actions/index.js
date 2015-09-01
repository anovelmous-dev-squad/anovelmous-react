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
  }
}

export function loadNovel (id) {
  return (dispatch, getState) => {
    return dispatch(fetchNovel(id));
  };
}
