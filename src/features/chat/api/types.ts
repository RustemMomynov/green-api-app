import { InstanceAuth } from "../../../common/types";

// common

type InstanceData = {
  idInstance: string;
  wid: string;
  typeInstance: string;
};

type SenderData = {
  chatId: string;
  chatName: string;
  sender: string;
  senderName: string;
  senderContactName: string;
};

type TextMessageData = {
  textMessage: string;
};

type MessageData = {
  typeMessage: "textMessage";
  textMessageData: TextMessageData;
};

type Body = {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
};

// queries

export type SendMessageRequest = {
  chatId: string;
  message: string;
} & InstanceAuth;

export type GetMessageNotificationResponse = {
  receiptId: number;
  body: Body;
};

export type DeleteNotificationRequest = {
  receiptId: number;
} & InstanceAuth;

export type DeleteNotificationResponse = {
  result: boolean;
  reason: string;
};
