import { combineReducers } from "redux";
import lostfound from "./lostfound";
import announce from "./announce";

export default combineReducers({
    lostfound,
    announce
});
