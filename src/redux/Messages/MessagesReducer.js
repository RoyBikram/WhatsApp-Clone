const InitialState = {
    Messages: {},
}

const MessagesReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return ({
                ...state,
                Messages:action.payload
            })
        default:
            return state;
    }
}

export default MessagesReducer;