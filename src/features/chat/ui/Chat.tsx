import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "../../../app/store";
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
} from "../api/chatApi";
import { addMessageToChat } from "../model/chatSlice";
import { InstanceAuth } from "../../../common/types";
import { SendMessageForm } from "./SendMessageForm";
import { ChatIdForm } from "./ChatIdForm";

export const Chat = () => {
  const { idInstance, apiTokenInstance } = useSelector<
    AppRootStateType,
    InstanceAuth
  >((state) => state.auth.instances);

  const [chatId, setChatId] = useState<string>("");

  const [deleteNotification] = useDeleteNotificationMutation();
  const { data, error } = useGetNotificationQuery(
    { apiTokenInstance, idInstance },
    {
      pollingInterval: 100, // Запрос каждые 0.1 секунды
    }
  );

  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: AppRootStateType) => state.chat);

  useEffect(() => {
    if (data?.body?.messageData?.textMessageData?.textMessage) {
      const textMessage = data.body.messageData.textMessageData.textMessage;
      const senderName = data.body.senderData?.senderName;
      const id = data.body.idMessage;
      const senderChatId = data.body.senderData?.chatId;

      if (senderChatId === chatId)
        dispatch(
          addMessageToChat({ id, senderName, textMessage, isSent: false })
        );
    }

    if (data?.receiptId) {
      (async () => {
        try {
          await deleteNotification({
            apiTokenInstance,
            idInstance,
            receiptId: data.receiptId,
          }).unwrap();
        } catch (err) {
          console.error("Ошибка удаления уведомления", err);
        }
      })();
    }
  }, [data, deleteNotification, dispatch, chatId]);

  return (
    <div className="chat">
      {chatId ? (
        <>
          <SendMessageForm chatId={chatId} />
          {error && <p style={{ color: "red" }}>Ошибка загрузки данных</p>}
          {messages.length > 0 ? (
            <div className="chat">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.isSent ? "sent-message" : "received-message"
                  }
                >
                  <strong>
                    {message.isSent ? "You" : message.senderName}:
                  </strong>
                  {message.textMessage}
                </div>
              ))}
            </div>
          ) : (
            <div>Начните чат</div>
          )}
        </>
      ) : (
        <ChatIdForm setChatId={setChatId} />
      )}
    </div>
  );
};
