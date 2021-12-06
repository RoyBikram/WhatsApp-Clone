const InitialState = {
    FriendsData: {},
    ActiveFriend: null,
    // Messages: []
}

const FriendsReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET_FRIENDS_DATA':
            return ({
                ...state,
                FriendsData:action.payload
            })
        case 'SET_ACTIVE_FRIEND':
            return ({
                ...state,
                ActiveFriend:action.payload
            })
        default:
            return state;
    }
}

export default FriendsReducer;