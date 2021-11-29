import { combineReducers } from "redux";
import UserReducer from "./User/UserReducer";

const RootReducer = combineReducers({
    User: UserReducer,
});

export default RootReducer;
