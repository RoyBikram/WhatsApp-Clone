const InitialState = {
    CurrentUser:null
}

const UserReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                CurrentUser:action.payload
            }
    
        default:
            return state
    }
}
export default UserReducer;