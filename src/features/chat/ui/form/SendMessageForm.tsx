import { Formik, Field, Form } from "formik";
import { useSendMessageMutation } from "../../api/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "../../../../app/store";
import { addMessageToChat } from "../../model/chatSlice";
import { InstanceAuth } from "../../../../common/types";
import s from "./Form.module.scss";
import sendIcon from "./../../../../assets/send.png";

type Props = {
  chatId: string;
};

export const SendMessageForm = ({ chatId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { idInstance, apiTokenInstance } = useSelector<
    AppRootStateType,
    InstanceAuth
  >((state) => state.auth.instances);

  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = async (messageText: string) => {
    try {
      const response = await sendMessage({
        idInstance,
        apiTokenInstance,
        chatId,
        message: messageText,
      }).unwrap();

      dispatch(
        addMessageToChat({
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
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, { resetForm }) => {
        handleSendMessage(values.message);
        resetForm(); // Сброс формы после отправки
      }}
    >
      <Form className={s.sendMessageForm}>
        <div>
          <Field
            as="textarea"
            name="message"
            rows={4}
            cols={50}
            placeholder="Введите сообщение"
            className={s.textarea}
          />
        </div>
        <div>
          <button type="submit" className={s.sendMessageButton}>
            <img src={sendIcon} alt="" className={s.img} />
          </button>
        </div>
      </Form>
    </Formik>
  );
};
