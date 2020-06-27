import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
// import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import reducerGenre from "./reducers/reducerGenre";

const logger = createLogger();
const enhancer = applyMiddleware(thunk, logger);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'reducerBook',
    'reducerAuthor',
    'reducerBorrow',
    'reducerGenre',
    '_persist',
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store);
  return {store, persistor};
};
