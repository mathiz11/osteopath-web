import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import { ActionType, useStore } from "../components/Store";
import { LoginSchema, LoginValues } from "../schemas/loginSchema";
import authService from "../services/authService";
import { translateMessage } from "../utils/responseMessage";
import Input from "../components/Input";
import Message, { MessageType } from "../components/Message";
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  let history = useHistory();
  const [, dispatch] = useStore();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginValues) => {
    const response = await authService.login(values);

    if (response.ok) {
      dispatch({ type: ActionType.LOG_IN });
      history.push("/");
    } else {
      const jsonResponse = await response.json();
      dispatch({
        type: ActionType.SET_MESSAGE,
        payload: {
          type: MessageType.ERROR,
          text: translateMessage(jsonResponse.message, response.ok),
        },
      });
    }
  };

  return (
    <Layout>
      <div className="login">
        <div className="container">
          <h1>Connexion</h1>
          <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
              <form onSubmit={handleSubmit}>
                <Message />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email}
                />
                <Input
                  id="password"
                  label="Mot de passe"
                  type="password"
                  placeholder="Mot de passe"
                  onChange={handleChange}
                  value={values.password}
                  error={errors.password}
                />
                <div className="center">
                  <button type="submit" className="primary">
                    Se connecter
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
