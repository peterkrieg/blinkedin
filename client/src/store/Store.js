import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from '../reducers';

const configureStore = () => {
  const middlewares = [thunk];

  //  Creating Enhancer
  const enhancer = compose(applyMiddleware(...middlewares));

  //  Create Store
  const store = createStore(rootReducer, {}, enhancer);

  //  Persist Store
  try {
    persistStore(store);
    console.log('persistStore Succeed');
  } catch (e) {
    console.log('persistStore Failed: ', e);
  }

  return store;
};

export default configureStore;
