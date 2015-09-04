import { TransformTypes } from 'constants';

export default function bookmark (state = {
  novel: '',
  chapter: '',
  ordinal: 0
}, action) {
  const { type } = action;

  return state;
}
