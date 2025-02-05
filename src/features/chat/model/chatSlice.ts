import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  id: string;
  sender: string;
  textMessage: string;
  isSent: boolean;
};

export const slice = createSlice({
  name: "chat",
  initialState: [] as Message[],
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
  },
});

export const { addMessage } = slice.actions;
export const chatReducer = slice.reducer;
export const chatPath = slice.reducerPath;
