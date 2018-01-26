import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import modal from './modal';


const config = {
  key: 'root',
  storage,
  blacklist: [],
};

const rootReducer = combineReducers({
  auth,
  modal,
});

// export default rootReducer
export default persistReducer(config, rootReducer);
