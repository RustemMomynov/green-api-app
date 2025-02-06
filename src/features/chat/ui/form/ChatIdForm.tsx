import { Formik, Field, Form } from "formik";
import s from "./Form.module.scss";

export const ChatIdForm = ({
  setChatId,
}: {
  setChatId: (value: string) => void;
}) => {
  return (
    <Formik
      initialValues={{ phoneNumber: "" }}
      onSubmit={(values) => {
        if (values.phoneNumber) {
          setChatId(`${values.phoneNumber}@c.us`);
        }
      }}
    >
      <Form className={s.chatIdForm}>
        <h2 className={s.h}>Введите номер телефона получателя</h2>
        <Field
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="7700...."
          className={s.input}
          required
        />
        <button className={s.button} type="submit">
          Подключиться
        </button>
      </Form>
    </Formik>
  );
};
