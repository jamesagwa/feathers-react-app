import { call, put, takeEvery, select } from "redux-saga/effects";

import { FETCH_USER_ITEMS, ADD_NEW_ITEM_ERROR, ADD_NEW_ITEM_SUCCESS } from "../actions/events";
import API from '../config/api';

// worker saga
function* fetchUserItems() {
    try {
        const { accessToken, user: { _id } } = yield select( state => state.fetchUser );
        const { data:userItems }  = yield call( API.getFromServer, {
            url: `/recipes?ownerId=${_id}`,
            token: accessToken
        });

        if (!userItems) {
            yield put({ type: ADD_NEW_ITEM_ERROR, error: 'Unable to fetch user item' });
        } else {
            yield put({ type: ADD_NEW_ITEM_SUCCESS, item: userItems.data });
        }
    } catch (error) {
        yield put({ type: ADD_NEW_ITEM_ERROR, error: error.message });
    }
};

// Watcher saga
export default function* fetchUserItemsSaga() {
    yield takeEvery(FETCH_USER_ITEMS, fetchUserItems);
}