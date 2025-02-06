import { Formik, Field, Form } from "formik";
import { useSendMessageMutation } from "../api/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "../../../app/store";
import { addMessageToChat } from "../model/chatSlice";
import { InstanceAuth } from "../../../common/types";
import { useState } from "react";

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
      onSubmit={(values) => {
        handleSendMessage(values.message);
      }}
    >
      <Form>
        <div>
          <Field
            as="textarea"
            name="message"
            rows={4}
            cols={50}
            placeholder="Введите ваше сообщение"
          />
        </div>
        <div>
          <button type="submit">Отправить</button>
        </div>
      </Form>
    </Formik>
  );
};
