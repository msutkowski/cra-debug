import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';

const createRootReducer = (history) => combineReducers({
    router: routerReducer(history),
});

const rootReducer = createRootReducer(createBrowserHistory());

export default rootReducer;