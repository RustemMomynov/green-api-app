import { Formik, Field, Form } from "formik";

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
      <Form>
        <label htmlFor="chatId">Введите номер телефона получателя</label>
        <Field
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Введите номер телефона получателя"
          required
        />
        <button type="submit">Подключиться</button>
      </Form>
    </Formik>
  );
};
