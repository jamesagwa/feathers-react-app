import { call, put, takeEvery, select } from "redux-saga/effects";

import API from '../config/api';
import { DELETE_ITEM, DELETE_ITEM_ERROR, DELETE_ITEM_SUCCESS } from "../actions/events";

// worker saga
function* deleteItem(action) {
    try {
        const { itemId } = action;
        const { accessToken } = yield select(state => state.fetchUser);
        const item = yield call(API.deleteFromServer, {
            url:`/recipes/${ itemId }`,
            token: accessToken
        });


        if (!item.data._id) {
            yield put({  type: DELETE_ITEM_ERROR, error: 'Item was not deleted'});
        } else {
            yield put({ type: DELETE_ITEM_SUCCESS, itemId });
        }

    } catch (error) {
        yield put({ type: DELETE_ITEM_ERROR, error: error.message });
    }
};

// watcher saga
export default function* deleteItemSaga() {
    yield takeEvery(DELETE_ITEM, deleteItem);
};