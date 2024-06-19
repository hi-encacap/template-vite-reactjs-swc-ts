import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "@interfaces/auth";
import { IConfig } from "@interfaces/common";

interface ICommonSlice {
  user: IUser | null;
  config: IConfig[] | null;
}

const initialState: ICommonSlice = {
  user: null,
  config: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setConfig: (state, action) => {
      state.config = action.payload;
    },
  },
});

export const { setUser, setConfig } = commonSlice.actions;

export default commonSlice.reducer;
