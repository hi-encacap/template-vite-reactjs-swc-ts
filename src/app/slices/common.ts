import { IUser } from "@interfaces/auth";
import { createSlice } from "@reduxjs/toolkit";

interface ICommonSlice {
  user: IUser | null;
}

const initialState: ICommonSlice = {
  user: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = commonSlice.actions;

export default commonSlice.reducer;
