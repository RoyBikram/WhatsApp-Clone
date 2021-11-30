const InitialState = {
    SearchData: null
}

const SearchReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_DATA':
            return ({
                ...state,
                SearchData:action.payload
            })
    
        default:
            return state;
    }
}

export default SearchReducer;