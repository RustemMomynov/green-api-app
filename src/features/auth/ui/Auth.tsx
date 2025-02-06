import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLazyGetAccountSettingsQuery } from "./../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "./../../../app/store";
import { login, setInstances } from "./../model/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    <div>
      <h2>Sign in</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="apiTokenInstance">API Token Instance</label>
            <Field
              type="text"
              id="apiTokenInstance"
              name="apiTokenInstance"
              placeholder="Введите API Token Instance"
            />
            <ErrorMessage name="apiTokenInstance" component="div" />
          </div>

          <div>
            <label htmlFor="idInstance">ID Instance</label>
            <Field
              type="text"
              id="idInstance"
              name="idInstance"
              placeholder="Введите ID Instance"
            />
            <ErrorMessage name="idInstance" component="div" />
          </div>

          <button type="submit">Отправить</button>
        </Form>
      </Formik>
    </div>
  );
};
