import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import logger from 'redux-logger';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];
let reduxDevTools = null;

if (process.env.NODE_ENV === 'development') {
    middleWares.push(logger);
    reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
    rootReducer, 
    reduxDevTools, 
    applyMiddleware(...middleWares)
);
const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(rootSaga);

export { store, persistor };