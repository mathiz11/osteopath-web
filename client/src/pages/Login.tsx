import { Formik } from "formik";
import React from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import { LoginSchema, LoginValues } from "../schemas/loginSchema";
import authService from "../services/authService";
import { MessageType } from "../utils/types";

const Login: React.FC = () => {
  //   const router = useRouter();
  const [message, setMessage] = React.useState<MessageType>();

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

  // console.log(document.cookie.split(";"));

  return (
    <Layout>
      <div className="form-page">
        <Header as="h1">Connexion</Header>
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setErrors }) => {
            console.log(
              await (
                await authService.login(values.email, values.password)
              ).json()
            );

            // const response = await authService.login(
            //   values.email,
            //   values.password
            // );

            // const { data, error } = await login(values);

            // if (data?.login.errors) {
            //   setErrors(toErrorMap(data.login.errors));
            // }

            // if (data?.login.login) {
            //   setAccessToken(data.login.login.accessToken);
            //   setRefreshToken(data.login.login.refreshToken);

            //   if (typeof router.query.next === "string") {
            //     router.push(router.query.next);
            //   } else {
            //     router.push("/");
            //   }
            // }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit}>
              {message && <Message color="red">{message}</Message>}
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
