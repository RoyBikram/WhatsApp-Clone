import { createSelector } from 'reselect';

export const MessageSelector = createSelector(
    [({ state, uid }) => state.Messages, ({ state, uid }) => uid],
    (Data ,uid) => Data.Messages[uid]?.Message
)