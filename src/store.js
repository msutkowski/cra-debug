import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import blockMiddleware from 'react-block-ui/lib/reduxMiddleware';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export const history = createHistory();
/*global process*/

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history), blockMiddleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['status'],
  stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// export default createStore(persistedReducer, initialState, composedEnhancers);

const store = createStore(persistedReducer, initialState, composedEnhancers);
export const persistor = persistStore(store);
export default store;