import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Input from "../components/Input";
import Layout from "../components/Layout";
import Message, { MessageType } from "../components/Message";
import { ActionType, useStore } from "../components/Store";
import {
  CardSchema,
  CardValues,
  DEFAULT_CARD_VALUES,
} from "../schemas/cardSchema";
import cardService from "../services/cardService";
import "../styles/CardEditPage.css";
import { translateMessage } from "../utils/responseMessage";

type LocationState = {
  formValues?: CardValues;
};

type ParamsType = {
  clientId: string;
  animalId: string;
  cardId?: string;
};

const CardEditPage = () => {
  const [formValues, setFormValues] = useState<CardValues>(DEFAULT_CARD_VALUES);
  const [, dispatch] = useStore();
  let history = useHistory<LocationState>();
  let { clientId, animalId, cardId } = useParams<ParamsType>();

  useEffect(() => {
    if (cardId && history.location.state.formValues) {
      setFormValues(history.location.state.formValues);
    }
  }, [cardId, history.location.state]);

  const submitForm = async (values: CardValues) => {
    let formData;

    if (values.schema) {
      formData = new FormData();
      formData.append("file", values.schema as Blob);
    }

    const response = await cardService.create(
      clientId,
      animalId,
      values,
      formData
    );

    if (response.ok) {
      history.push(`/client/${clientId}/animal/${animalId}`);
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
      <div className="card-edit">
        <div className="container">
          <h1>Ajouter une fiche</h1>
          <Formik
            initialValues={formValues}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={CardSchema}
            onSubmit={submitForm}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                <Message />
                <Input
                  id="age"
                  label="Age"
                  type="number"
                  onChange={handleChange}
                  value={values.age}
                  error={errors.age}
                  isRequired
                />
                <Input
                  id="isCastrated"
                  label="Castré ?"
                  setFieldValue={setFieldValue}
                  value={values.isCastrated}
                  error={errors.isCastrated}
                  isSwitch
                  isRequired
                />
                <Input
                  id="diet"
                  label="Régime"
                  onChange={handleChange}
                  value={values.diet}
                  error={errors.diet}
                  isTextArea
                />
                <Input
                  id="score"
                  label="Score"
                  setFieldValue={setFieldValue}
                  value={values.score}
                  error={errors.score}
                  isNote
                  isRequired
                />
                <Input
                  id="discipline"
                  label="Discipline"
                  onChange={handleChange}
                  value={values.discipline}
                  error={errors.discipline}
                  isTextArea
                />
                <Input
                  id="lifestyle"
                  label="Mode de vie"
                  onChange={handleChange}
                  value={values.lifestyle}
                  error={errors.lifestyle}
                  isTextArea
                />
                <Input
                  id="antecedent"
                  label="Antécédent"
                  onChange={handleChange}
                  value={values.antecedent}
                  error={errors.antecedent}
                  isTextArea
                />
                <Input
                  id="dewormer"
                  label="Vermifuge"
                  type="text"
                  onChange={handleChange}
                  value={values.dewormer}
                  error={errors.dewormer}
                />
                <Input
                  id="vaccine"
                  label="Vaccin"
                  onChange={handleChange}
                  value={values.vaccine}
                  error={errors.vaccine}
                  isTextArea
                />
                <Input
                  id="marshal"
                  label="Maréchal"
                  onChange={handleChange}
                  value={values.marshal}
                  error={errors.marshal}
                  isTextArea
                />
                <Input
                  id="dentistry"
                  label="Dentisterie"
                  onChange={handleChange}
                  value={values.dentistry}
                  error={errors.dentistry}
                  isTextArea
                />
                <Input
                  id="observation"
                  label="Observation"
                  onChange={handleChange}
                  value={values.observation}
                  error={errors.observation}
                  isTextArea
                />
                <Input
                  id="schema"
                  label="Schéma"
                  setFieldValue={setFieldValue}
                  value={values.schema}
                  error={errors.schema}
                  isFile
                />
                <Input
                  id="conclusion"
                  label="Conclusion"
                  onChange={handleChange}
                  value={values.conclusion}
                  error={errors.conclusion}
                  isTextArea
                />
                <Input
                  id="treatment"
                  label="Traitement"
                  onChange={handleChange}
                  value={values.treatment}
                  error={errors.treatment}
                  isTextArea
                />
                <Input
                  id="restTime"
                  label="Temps de repos"
                  type="text"
                  onChange={handleChange}
                  value={values.restTime}
                  error={errors.restTime}
                />
                <Input
                  id="activityRetake"
                  label="Reprise d'activité"
                  type="text"
                  onChange={handleChange}
                  value={values.activityRetake}
                  error={errors.activityRetake}
                />
                <div className="center">
                  <button type="submit" className="primary">
                    Ajouter
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

export default CardEditPage;
