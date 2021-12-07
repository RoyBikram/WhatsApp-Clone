import { createSelector } from 'reselect';

export const ImgUrlSelector = createSelector(
    [(state) => state.User.CurrentUser],
    (Data) => Data?.photoURL
)
export const UserUidSelector = createSelector(
    [(state) => state.User.CurrentUser],
    (Data) => Data?.uid
)