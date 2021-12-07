import { createSelector } from 'reselect';

export const SearchDataSelector = createSelector(
    [(state) => state.SearchData],
    (Data) => Data.SearchData
)