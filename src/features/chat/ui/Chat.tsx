import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "../../../app/store";
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
} from "../api/chatApi";
import { addMessageToChat } from "../model/chatSlice";
import { InstanceAuth } from "../../../common/types";
import { SendMessageForm } from "./form/SendMessageForm";
import { ChatIdForm } from "./form/ChatIdForm";
import s from "./Chat.module.scss";
import { Message } from "./message/Message";

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
    <div>
      {chatId ? (
        <div className={s.chat}>
          <header className={s.header}>
            <h2>{chatId}</h2>
          </header>
          <div className={s.messagesWrapper}>
            {error && <p style={{ color: "red" }}>Ошибка загрузки данных</p>}
            {messages.length > 0 ? (
              <div className={s.messages}>
                {messages
                  .slice()
                  .reverse()
                  .map((message) => (
                    <Message
                      id={message.id}
                      isSent={message.isSent}
                      senderName={message.senderName}
                      text={message.textMessage}
                    />
                  ))}
              </div>
            ) : (
              <div>Начните чат</div>
            )}
          </div>

          <SendMessageForm chatId={chatId} />
        </div>
      ) : (
        <ChatIdForm setChatId={setChatId} />
      )}
    </div>
  );
};
