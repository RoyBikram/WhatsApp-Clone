import { createSelector } from 'reselect';

export const ActiveFriendUidSelector = createSelector(
    [(state) => state.FriendsData],
    (Data) => Data.ActiveFriend
)
export const FriendsUidSelector = createSelector(
    [(state) => Object.keys(state.FriendsData?.FriendsData)],
    (Data) => {
        // console.log('render data')
       return Data
    }
)