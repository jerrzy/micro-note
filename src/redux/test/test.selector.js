import { createSelector } from "reselect";

export const selectCount = (state) => {
  return state.count;
};
