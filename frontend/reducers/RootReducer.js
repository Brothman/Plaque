import { combineReducers } from "redux";
import MessagesReducer from './MessagesReducer';

const RootReducer = combineReducers({
    messages: MessagesReducer,
});

export default RootReducer;