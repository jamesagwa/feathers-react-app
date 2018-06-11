import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS } from "../actions/events";

import API from '../config/api';

// worker saga
function* fetchUser(action){
    try {
        const { email, password } = action.user;
        
        // get the token and user object from posting the data
        const { data: { accessToken, user }} = yield call(API.submitToServer, {
            data: {strategy: 'local', email, password },
            url: '/authentication'
        });
        
        if (!accessToken) {
            yield put({ type: FETCH_USER_ERROR, error: 'Invalid login' });
        } else {
            yield put({ type: FETCH_USER_SUCCESS, data: { accessToken, user } });
        }
        
    } catch (error) {
        yield put({ type: FETCH_USER_ERROR, error: error.message });
    }
};

// watcher saga
export default function* fetchUserSaga() {
    yield takeEvery(FETCH_USER, fetchUser);
};