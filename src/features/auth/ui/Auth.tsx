import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLazyGetAccountSettingsQuery } from "./../api/authApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./../../../app/store";
import { login, setInstances } from "./../model/authSlice";
import s from "./Auth.module.scss";

// Значения по умолчанию
const initialValues = {
  apiTokenInstance: "",
  idInstance: "",
};

const validationSchema = Yup.object({
  apiTokenInstance: Yup.string()
    .required("API Token обязателен")
    .matches(
      /^[a-z0-9]+$/i,
      "API Token должен быть в виде строки, состоящей из цифр и латинских букв"
    ),
  idInstance: Yup.string()
    .required("ID обязателен")
    .matches(/^\d+$/, "ID должен содержать только цифры"),
});

export const Auth = () => {
  const [getAccountSettings] = useLazyGetAccountSettingsQuery();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: {
    apiTokenInstance: string;
    idInstance: string;
  }) => {
    try {
      await getAccountSettings(values).unwrap();
      dispatch(setInstances(values));
      dispatch(login());
    } catch (err) {
      alert("Данных инстансов не существует");
    }
  };

  return (
    <div className={s.auth}>
      <h2 className={s.h}>Вход в WhatsApp</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <div className={s.inputWrapper}>
            <label className={s.label} htmlFor="apiTokenInstance">
              API Token Instance
            </label>
            <Field
              className={s.input}
              type="password"
              id="apiTokenInstance"
              name="apiTokenInstance"
            />
            <ErrorMessage
              className={s.inputError}
              name="apiTokenInstance"
              component="div"
            />
          </div>

          <div className={s.inputWrapper}>
            <label className={s.label} htmlFor="idInstance">
              ID Instance
            </label>
            <Field
              className={s.input}
              type="text"
              id="idInstance"
              name="idInstance"
            />
            <ErrorMessage
              className={s.inputError}
              name="idInstance"
              component="div"
            />
          </div>

          <button className={s.button} type="submit">
            Sign in
          </button>
        </Form>
      </Formik>
    </div>
  );
};
