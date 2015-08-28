import { createReducer } from 'utils';

const GET_NOVEL = 'GET_NOVEL';
const initialState  = {
  novel: { name: 'Fake Novel 1', id: 1 }
};

export default createReducer(initialState, {
  [GET_NOVEL] : (state, payload) => state // aka noop
});
