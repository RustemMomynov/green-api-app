import { useEffect, useState } from "react";
import "./App.css";
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
  useSendMessageMutation,
} from "../features/chat/api/chatApi";
import { addMessage } from "../features/chat/model/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "./store";

function App() {
  const apiTokenInstance = "359a39592dc148ba9ed4e06bc7b78c75ad5f299fd56240849b";
  const idInstance = "7103185037";
  const chatId = "77781750744@c.us";

  const [sendMessage] = useSendMessageMutation();
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
    if (data && data.body.messageData.textMessageData) {
      const textMessage = data.body.messageData.textMessageData.textMessage;
      const senderName = data.body.senderData.senderName;
      const id = data.body.idMessage;

      dispatch(addMessage({ id, senderName, textMessage, isSent: false }));

      // Удаление уведомления после получения сообщения
      if (data.receiptId) {
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
    }
  }, [data, deleteNotification]);

  const handleSendMessage = async () => {
    const messageText = "FFFFFFFF"; // Здесь сообщение для отправки
    try {
      const response = await sendMessage({
        idInstance,
        apiTokenInstance,
        chatId,
        message: messageText,
      }).unwrap();

      // Добавление отправленного сообщения в чат

      dispatch(
        addMessage({
          id: response.idMessage,
          senderName: "You",
          textMessage: messageText,
          isSent: true,
        })
      );
    } catch (err) {
      console.error("Ошибка отправки", err);
    }
  };

  return (
    <div className="App">
      <button onClick={handleSendMessage}>Отправить сообщение</button>
      {error && <p style={{ color: "red" }}>Ошибка загрузки данных</p>}
      {messages.length > 0 ? (
        <div className="chat">
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.isSent ? "sent-message" : "received-message"}
            >
              <strong>{message.isSent ? "You" : message.senderName}:</strong>
              {message.textMessage}
            </div>
          ))}
        </div>
      ) : (
        <div>Начните чат</div>
      )}
    </div>
  );
}

export default App;
