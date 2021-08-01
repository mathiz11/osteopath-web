import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Header, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import { ACTION, useStore } from "../components/Store";
import { LoginSchema, LoginValues } from "../schemas/loginSchema";
import authService from "../services/authService";
import { translateMessage } from "../utils/responseMessage";
import { MessageType } from "../utils/types";

const Login: React.FC = () => {
  let history = useHistory();
  const [message, setMessage] = React.useState<MessageType>({});
  const [, dispatch] = useStore();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage({});
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
        color: "red",
        text: translateMessage(jsonResponse.message, response.ok),
      });
    }
  };

  return (
    <Layout>
      <div className="form-page">
        <Header as="h1">Connexion</Header>
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit}>
              {message.color && (
                <Message color={message.color}>{message.text}</Message>
              )}
              <Form.Input
                id="email"
                icon="at"
                iconPosition="left"
                label="Email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={values.email}
                error={errors.email && { content: errors.email }}
              />
              <Form.Input
                id="password"
                icon="lock"
                iconPosition="left"
                label="Mot de passe"
                type="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                value={values.password}
                error={errors.password && { content: errors.password }}
              />
              <Button type="submit" loading={isSubmitting} fluid>
                Se connecter
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Login;
