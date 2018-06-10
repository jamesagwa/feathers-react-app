import storage from 'localforage';
import { persistReducer } from "redux-persist";

import { REG_USER_SUCCESS, REG_USER_ERROR } from "../actions/events";

const regUserReducer = ( state={}, action) => {
    switch (action.type) {
        case REG_USER_SUCCESS:
            return {
                ...state,
                ...action.result
            };
        
        case REG_USER_ERROR:
            return{
                ...state,
                error: action.error
            };
    
        default:
            return state;
    }
};

// blacklist the error state
const persistConfig = {
    key: 'regUser',
    storage,
    blacklist: ['error']
};

export default persistReducer(persistConfig,regUserReducer);