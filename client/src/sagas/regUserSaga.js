import { call, put, takeEvery } from 'redux-saga/effects';
import { REG_USER, REG_USER_ERROR, REG_USER_SUCCESS } from "../actions/events";

import API from '../config/api';


// worker saga, fired on REG_USER event
function* regUser(action) {
    try {
        let { payload } = action;
        let { email, password } = action.payload;

        // create a new user and generate an access token
        const userData = yield call(API.submitToServer, {
            data: payload,
            url: '/users'
        });
        const { data: { accessToken }} = yield call(API.submitToServer, {
            data: {strategy: 'local', email, password },
            url: '/authentication'
        });

        if (userData.error) {
            yield put({ type: REG_USER_ERROR, error: userData.error });
        } else {
            yield put({ type: REG_USER_SUCCESS, result: { user: userData.data, accessToken } })
        }

    } catch (error) {
        yield put({ type: REG_USER_ERROR, error: error.message });
    }
}


// watcher saga, watches for the REG_USER event and calls the worker saga
export default function* regUserSaga() {
    yield takeEvery(REG_USER, regUser);
};