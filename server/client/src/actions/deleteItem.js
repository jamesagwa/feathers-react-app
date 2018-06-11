import { DELETE_ITEM } from "./events";

const deleteItem = itemId => ({
    type: DELETE_ITEM,
    itemId
});

export default deleteItem;