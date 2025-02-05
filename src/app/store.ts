import { configureStore } from "@reduxjs/toolkit";
import { chatReducer, chatPath } from "../features/chat/model/chatSlice";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    [chatPath]: chatReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
