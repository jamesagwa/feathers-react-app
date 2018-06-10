import { ADD_NEW_ITEM_ERROR, ADD_NEW_ITEM_SUCCESS, DELETE_ITEM_SUCCESS } from "../actions/events";
import { persistReducer, PURGE } from "redux-persist";
// import _ from 'lodash';
import storage from 'localforage';

// store the items into an array
const addToItems = (item, state) => {
    const stateItems = state.items? [...state.items]: [];

    // if (Array.isArray(item) && _.isEqual(stateItems, item)) {
    //     return stateItems;
    // } else 
    if(!Array.isArray(item) && typeof item === 'object'){
        // if its a single item object add to new array with current state
        const items = [...stateItems, item];
        return items;
    } else {
        // if no current state and no single added, just return from server
        return item;
    }
};

const deleteFromItems = (itemId, state) => {
    let stateItems = state.items? [...state.items]: [];

    if (stateItems[0]) {
        const item = stateItems.findIndex((item) => item._id === itemId);
        stateItems.splice(item, 1);
    }

    return stateItems;
};

const addNewItem = (state={}, action) => {
    switch (action.type) {
        case ADD_NEW_ITEM_SUCCESS:
            return {
                ...state,
                items: addToItems(action.item, state)//add each item to the array based on data from saga put
            };
    
        case ADD_NEW_ITEM_ERROR:
            return {
                ...state,
                error: action.error
            };
        
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                items: deleteFromItems(action.itemId, state)
            };
        
        case PURGE:
            return {};

        default:
            return state;
    }
};

const persistConfig = {
    key: 'newItem',
    storage,
    blacklist: ['error']
};

export default persistReducer(persistConfig, addNewItem);