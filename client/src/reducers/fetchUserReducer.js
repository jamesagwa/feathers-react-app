import { persistReducer, PURGE } from 'redux-persist';
import storage from 'localforage';
import { FETCH_USER_ERROR, FETCH_USER_SUCCESS } from '../actions/events';


const fetchUser = (state={}, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                ...action.data //spread the action data on the state obj
            };
            
        case FETCH_USER_ERROR:
            return {
                ...state,
                error: action.error
            };

        case PURGE:
            return {};

        default:
            return state;
    }
};

const persistConfig = {
    key: 'fetchUser',
    storage,
    blacklist: ['error']
};

export default persistReducer(persistConfig,fetchUser);