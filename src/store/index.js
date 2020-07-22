import { createStore, combineReducers } from "redux";
import messageData from "./reducer/messageReducer";
import loginReducer from "./reducer/loginReducer";
import boardReducer from "./reducer/boardReducer";

export default createStore(combineReducers({
    messageData,
    loginReducer,
    boardReducer
}))