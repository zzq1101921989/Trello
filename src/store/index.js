import { createStore, combineReducers } from "redux";
import messageData from "./reducer/messageReducer";
import loginReducer from "./reducer/loginReducer";
import boardReducer from "./reducer/boardReducer";
import boardListReducer from "./reducer/boardListReducer";
import boardListCardReducer from "./reducer/boardListCardReducer";
import commentReducer from "./reducer/commentReducer";

export default createStore(combineReducers({
    serverPath: function () {
        return {
            staticPath: process.env.REACT_APP_SERVER_STATIC_PATH
        }
    },
    messageData,
    loginReducer,
    boardReducer,
    boardListReducer,
    boardListCardReducer,
    commentReducer
}))