import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  id: string;
  senderName: string;
  textMessage: string;
  isSent: boolean;
};

export const slice = createSlice({
  name: "chat",
  initialState: [] as Message[],
  reducers: {
    addMessageToChat: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
  },
});

export const { addMessageToChat } = slice.actions;
export const chatReducer = slice.reducer;
