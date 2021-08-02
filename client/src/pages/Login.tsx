import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import { ACTION, useStore } from "../components/Store";
import { LoginSchema, LoginValues } from "../schemas/loginSchema";
import authService from "../services/authService";
import { translateMessage } from "../utils/responseMessage";
import { MessageType } from "../utils/types";
import Input from "../components/Input";
import Message from "../components/Message";
import "../styles/Login.css";

const Login: React.FC = () => {
  let history = useHistory();
  const [message, setMessage] = React.useState<MessageType>({
    type: null,
    text: null,
  });
  const [, dispatch] = useStore();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage({ type: null, text: null });
      }, 5000);
    }
  }, [message]);

  const handleSubmit = async (values: LoginValues) => {
    const response = await authService.login(values);

    if (response.ok) {
      dispatch({ type: ACTION.LOG_IN });
      history.push("/");
    } else {
      const jsonResponse = await response.json();
      setMessage({
        type: "error",
        text: translateMessage(jsonResponse.message, response.ok),
      });
    }
  };

  return (
    <Layout>
      <div className="login">
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
              {message.type && (
                <Message type={message.type}>{message.text}</Message>
              )}
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
    </Layout>
  );
};

export default Login;
