import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import logger from 'redux-logger';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];


if (process.env.NODE_ENV === 'development') {
    middleWares.push(logger);
}

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
    applyMiddleware(...middleWares)
);
const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(rootSaga);

export { store, persistor };