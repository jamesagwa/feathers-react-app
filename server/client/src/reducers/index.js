import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import regUser from './regUserReducer';
import fetchUser from './fetchUserReducer';
import createNew from './createNewReducer';
// always use the form key for the reducers
const rootReducer = combineReducers({
    form: formReducer,
    regUser,
    fetchUser,
    createNew
});

export default rootReducer;