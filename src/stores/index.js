import { compose, createStore, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';
import reducer from 'reducers';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middleware/api';
import createLogger from 'redux-logger';

let buildStore;

if (__DEBUG__) {
  buildStore = compose(devTools(), createStore);
} else {
  buildStore = createStore;
}

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => __DEV__
})

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  apiMiddleware,
  logger
);

export default compose(createStoreWithMiddleware, buildStore)(reducer);
