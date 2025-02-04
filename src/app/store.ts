import { configureStore } from "@reduxjs/toolkit";
import { chatReducer, chatPath } from "../features/chat/model/chatSlice";

export const store = configureStore({
  reducer: {
    [chatPath]: chatReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
