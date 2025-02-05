import { createSlice } from "@reduxjs/toolkit";

type Message = {
  id: string;
  sender: string;
  textMessage: string;
  isSent: boolean;
};

export const slice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {},
});

export const chatReducer = slice.reducer;
export const chatPath = slice.reducerPath;
