import { ADD_NEW_ITEM } from "./events";

const addNew = item => ({
    type: ADD_NEW_ITEM,
    item
});

export default addNew;