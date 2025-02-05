import { baseApi } from "../../../app/baseApi";
import {
  DeleteNotificationRequest,
  DeleteNotificationResponse,
  GetMessageNotificationResponse,
  InstanceAuth,
  SendMessageRequest,
} from "./types";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      {
        idMessage: string;
      },
      SendMessageRequest
    >({
      query: ({ apiTokenInstance, idInstance, chatId, message }) => ({
        url: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        body: {
          chatId,
          message,
        },
        method: "POST",
      }),
    }),

    getNotification: builder.query<
      GetMessageNotificationResponse,
      InstanceAuth
    >({
      query: ({ apiTokenInstance, idInstance }) => ({
        url: `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`,
      }),
    }),

    deleteNotification: builder.mutation<
      DeleteNotificationResponse,
      DeleteNotificationRequest
    >({
      query: ({ apiTokenInstance, idInstance, receiptId }) => ({
        url: `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetNotificationQuery,
  useDeleteNotificationMutation,
} = chatApi;
