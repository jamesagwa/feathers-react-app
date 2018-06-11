import { fork } from 'redux-saga/effects';

import regUserSaga from './regUserSaga';
import fetchUserSaga from './fetchUserSaga';
import createNewSaga from './createNewSaga';
import fetchUserItemsSaga from './fetchUserItemsSaga';
import deleteItemSaga from './deleteItemSaga';

function* rootSaga() {
    yield fork(fetchUserSaga);
    yield fork(regUserSaga);
    yield fork(createNewSaga);
    yield fork(fetchUserItemsSaga);
    yield fork(deleteItemSaga);
};

export default rootSaga;