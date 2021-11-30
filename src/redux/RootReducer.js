import { combineReducers } from "redux";
import UserReducer from "./User/UserReducer";
import SearchReducer from './Search/SearchReducer'

const RootReducer = combineReducers({
    User: UserReducer,
    SearchData: SearchReducer
});

export default RootReducer;
