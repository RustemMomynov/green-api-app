import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InstanceAuth } from "../../../common/types";

export const slice = createSlice({
  name: "chat",
  initialState: {
    instances: { idInstance: "", apiTokenInstance: "" } as InstanceAuth,
    isAuthorized: false as boolean,
  },
  reducers: {
    setInstances: (state, action: PayloadAction<InstanceAuth>) => {
      state.instances = action.payload;
    },
    login: (state) => {
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.isAuthorized = false;
    },
  },
});

export const { setInstances, login, logout } = slice.actions;
export const authReducer = slice.reducer;
export const authPath = slice.reducerPath;
