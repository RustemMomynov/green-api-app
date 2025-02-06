import { baseApi } from "../../../app/baseApi";
import { InstanceAuth } from "../../../common/types";
import {
  DeleteNotificationRequest,
  DeleteNotificationResponse,
  GetMessageNotificationResponse,
  SendMessageRequest,
} from "./types";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET
    getNotification: builder.query<
      GetMessageNotificationResponse,
      InstanceAuth
    >({
      query: ({ apiTokenInstance, idInstance }) => ({
        url: `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`,
      }),
    }),

    // POST
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

    // DELETE
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
