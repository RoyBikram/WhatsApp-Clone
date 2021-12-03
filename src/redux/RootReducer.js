import { combineReducers } from "redux";
import UserReducer from "./User/UserReducer";
import SearchReducer from './Search/SearchReducer'
import FriendsReducer from './Friends/FriendsReducer'

const RootReducer = combineReducers({
    User: UserReducer,
    SearchData: SearchReducer,
    FriendsData: FriendsReducer
});

export default RootReducer;
