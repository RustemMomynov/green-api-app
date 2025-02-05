import { useEffect, useState } from "react";
import "./App.css";
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
  useSendMessageMutation,
} from "../features/chat/api/chatApi";

// Типизация для сообщений
type Message = {
  id: string;
  sender: string;
  textMessage: string;
  isSent: boolean;
};

function App() {
  const [sendMessage] = useSendMessageMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const { data, error, isLoading, refetch } = useGetNotificationQuery(
    {
      apiTokenInstance: "359a39592dc148ba9ed4e06bc7b78c75ad5f299fd56240849b",
      idInstance: "7103185037",
    },
    {
      pollingInterval: 100, // Запрос каждые 5 секунд
    }
  );

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (data && data.body) {
      const receivedMessage = data.body.messageData.textMessageData.textMessage;
      const newMessage: Message = {
        id: data.body.idMessage,
        sender: data.body.senderData.senderName,
        textMessage: receivedMessage,
        isSent: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Удаление уведомления после получения сообщения
      if (data.receiptId) {
        (async () => {
          try {
            await deleteNotification({
              apiTokenInstance:
                "359a39592dc148ba9ed4e06bc7b78c75ad5f299fd56240849b",
              idInstance: "7103185037",
              receiptId: data.receiptId,
            }).unwrap();
            console.log(`Уведомление ${data.receiptId} удалено`);
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
        idInstance: "7103185037",
        apiTokenInstance: "359a39592dc148ba9ed4e06bc7b78c75ad5f299fd56240849b",
        chatId: "77781750744@c.us",
        message: messageText,
      }).unwrap();
      console.log("Сообщение отправлено!");

      // Добавление отправленного сообщения в чат
      const newMessage: Message = {
        id: response.idMessage,
        sender: "You", // Отправитель
        textMessage: messageText,
        isSent: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (err) {
      console.error("Ошибка отправки", err);
    }
  };

  return (
    <div className="App">
      <button onClick={handleSendMessage}>Отправить сообщение</button>
      <button onClick={refetch} disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Получить уведомление"}
      </button>
      {error && <p style={{ color: "red" }}>Ошибка загрузки данных</p>}
      {messages.length > 0 && (
        <div className="chat">
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.isSent ? "sent-message" : "received-message"}
            >
              <strong>{message.isSent ? "You" : message.sender}:</strong>{" "}
              {message.textMessage}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
