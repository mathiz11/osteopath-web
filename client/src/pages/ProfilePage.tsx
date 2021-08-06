import { Formik } from "formik";
import { useEffect, useState } from "react";
import { BsPencilSquare, BsX } from "react-icons/bs";
import Input from "../components/Input";
import Layout from "../components/Layout";
import Message, { MessageType } from "../components/Message";
import { ActionType, useStore } from "../components/Store";
import { User } from "../entities/User";
import { toUserValues, UserSchema, UserValues } from "../schemas/userSchema";
import userService from "../services/userService";
import "../styles/ProfilePage.css";
import { translateMessage } from "../utils/responseMessage";

const ProfilePage = () => {
  const [user, setUser] = useState<User | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [, dispatch] = useStore();

  const getUser = async () => {
    const response = await userService.get();
    if (response.ok) {
      const jsonResponse = await response.json();
      setUser(jsonResponse.user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const submitForm = async (values: UserValues) => {
    console.log(values);
    const response = await userService.edit(values);
    const jsonResponse = await response.json();

    dispatch({
      type: ActionType.SET_MESSAGE,
      payload: {
        type: response.ok ? MessageType.SUCCESS : MessageType.ERROR,
        text: translateMessage(jsonResponse.message, response.ok),
      },
    });

    if (response.ok) setIsEditing(false);
  };

  return (
    <Layout>
      <div className="profile">
        <div className="container">
          <div className="header action-button">
            <h1>Profil</h1>
            <button
              className="secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <BsX size="18" />
                  <span>Annuler</span>
                </>
              ) : (
                <>
                  <BsPencilSquare />
                  <span>Modifier</span>
                </>
              )}
            </button>
          </div>
          {user && (
            <Formik
              initialValues={toUserValues(user)}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={UserSchema}
              onSubmit={submitForm}
            >
              {({ values, handleChange, handleSubmit, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Message />
                  <div className="full-name">
                    <Input
                      id="firstname"
                      label="Prénom"
                      type="text"
                      onChange={handleChange}
                      value={values.firstname}
                      error={errors.firstname}
                      isRequired
                      isDisabled={!isEditing}
                    />
                    <Input
                      id="lastname"
                      label="Nom"
                      type="text"
                      onChange={handleChange}
                      value={values.lastname}
                      error={errors.lastname}
                      isRequired
                      isDisabled={!isEditing}
                    />
                  </div>
                  <Input
                    id="numberOA"
                    label="Numéro OA"
                    type="text"
                    onChange={handleChange}
                    value={values.numberOA}
                    error={errors.numberOA}
                    isDisabled={!isEditing}
                  />
                  <Input
                    id="email"
                    label="Email"
                    type="text"
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email}
                    isRequired
                    isDisabled={!isEditing}
                  />
                  <Input
                    id="phone"
                    label="Téléphone"
                    type="text"
                    onChange={handleChange}
                    value={values.phone}
                    error={errors.phone}
                    isDisabled={!isEditing}
                  />
                  <Input
                    isTextArea
                    id="address"
                    label="Adresse"
                    onChange={handleChange}
                    value={values.address}
                    error={errors.address}
                    isDisabled={!isEditing}
                  />
                  <div className="center">
                    <button
                      type="submit"
                      className={`primary${isEditing ? " open" : ""}`}
                    >
                      Modifier
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
