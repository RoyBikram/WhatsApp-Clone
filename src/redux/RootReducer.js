import { combineReducers } from "redux";
import UserReducer from "./User/UserReducer";
import SearchReducer from './Search/SearchReducer'
import FriendsReducer from './Friends/FriendsReducer'
import MessagesReducer from './Messages/MessagesReducer'

const RootReducer = combineReducers({
    User: UserReducer,
    SearchData: SearchReducer,
    FriendsData: FriendsReducer,
    Messages: MessagesReducer
});

export default RootReducer;
