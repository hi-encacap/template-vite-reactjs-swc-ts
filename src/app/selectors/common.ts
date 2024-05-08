import { RootState } from "@interfaces/redux";
import { createSelector } from "@reduxjs/toolkit";

export const userSelector = createSelector(
  (state: RootState) => state.common,
  (common) => common.user,
);
