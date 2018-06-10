import { call, put, takeEvery, select } from "redux-saga/effects";
import { ADD_NEW_ITEM, ADD_NEW_ITEM_ERROR, ADD_NEW_ITEM_SUCCESS } from "../actions/events";
import API from '../config/api';

// worker saga
function* addNewItem(action) {
    try {
        const { item } = action;
        const { item: { imgURI} } = action;
        let fileUri = '';

        //select the accesstoken from the current state, fetchUser
        // send the accessToken with the data for authorization
        const { accessToken, user: { _id } } = yield select( state => state.fetchUser );
        if (imgURI !== '') {
            fileUri = yield call(API.sendFile, {
                data: imgURI,
                url: '/uploads',
                token: accessToken
            });            
        }

        const mainItem = yield call(API.submitWithToken, {
            // spread the item unto the new object and add user id
            data: {...item, imgURI: fileUri ? fileUri.data.id : undefined, ownerId: _id},
            url: '/recipes',
            token: accessToken
        });

        if (!mainItem.data._id) {
            yield put({ type: ADD_NEW_ITEM_ERROR, error: 'Item was not added' });
        } else {
            yield put({ type: ADD_NEW_ITEM_SUCCESS, item: mainItem.data });
        }

    } catch (error) {
        yield put({ type: ADD_NEW_ITEM_ERROR, error: error.message });
    }
}

// watcher saga
export default function* addNewSaga() {
    yield takeEvery(ADD_NEW_ITEM, addNewItem);
}