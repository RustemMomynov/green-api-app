import s from "./Message.module.scss";

type P = {
  senderName: string;
  text: string;
  id: string;
  isSent: boolean;
};

export const Message = ({ senderName, text, id, isSent }: P) => {
  return (
    <div className={s.messageWrapper}>
      <div key={id} className={isSent ? s.sentMessage : s.receivedMessage}>
        <div className={s.name}>{isSent ? "You" : senderName}:</div>
        <div className={s.text}>{text}</div>
      </div>
    </div>
  );
};
