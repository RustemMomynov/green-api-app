import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "../features/chat/model/chatSlice";
import { baseApi } from "./baseApi";
import { authReducer } from "../features/auth/model/authSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
