import { Formik } from "formik";
import { useLocation } from "react-router-dom";
import Input from "../components/Input";
import Layout from "../components/Layout";
import Message from "../components/Message";
import { CardValues } from "../schemas/cardSchema";
import { LoginSchema } from "../schemas/loginSchema";
import "../styles/CardEditPage.css";

type LocationState = {
  formValues: CardValues;
};

const CardEditPage = () => {
  let location = useLocation<LocationState>();

  const submitForm = async (values: CardValues) => {
    console.log(values);
  };

  return (
    <Layout>
      <div className="card-edit">
        <div className="container">
          <h1>Ajouter une fiche</h1>
          <Formik
            initialValues={location.state.formValues}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={LoginSchema}
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
                />
                <Input
                  id="isCastrated"
                  label="Castré ?"
                  setFieldValue={setFieldValue}
                  value={values.isCastrated}
                  error={errors.isCastrated}
                  isSwitch
                />
                <Input
                  id="diet"
                  label="Régime"
                  type="text"
                  onChange={handleChange}
                  value={values.diet}
                  error={errors.diet}
                />
                <Input
                  id="score"
                  label="Score"
                  setFieldValue={setFieldValue}
                  value={values.score}
                  error={errors.score}
                  isNote
                />
                <Input
                  id="discipline"
                  label="Discipline"
                  type="text"
                  onChange={handleChange}
                  value={values.discipline}
                  error={errors.discipline}
                />
                <Input
                  id="lifestyle"
                  label="Mode de vie"
                  type="text"
                  onChange={handleChange}
                  value={values.lifestyle}
                  error={errors.lifestyle}
                />
                <Input
                  id="antecedent"
                  label="Antécédent"
                  type="text"
                  onChange={handleChange}
                  value={values.antecedent}
                  error={errors.antecedent}
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
                  type="text"
                  onChange={handleChange}
                  value={values.vaccine}
                  error={errors.vaccine}
                />
                <Input
                  id="marshal"
                  label="Maréchal"
                  type="text"
                  onChange={handleChange}
                  value={values.marshal}
                  error={errors.marshal}
                />
                <Input
                  id="dentistry"
                  label="Dentisterie"
                  type="text"
                  onChange={handleChange}
                  value={values.dentistry}
                  error={errors.dentistry}
                />
                <Input
                  id="observation"
                  label="Observation"
                  type="text"
                  onChange={handleChange}
                  value={values.observation}
                  error={errors.observation}
                />
                <Input
                  id="schema"
                  label="Schéma"
                  onChange={handleChange}
                  value={values.observation}
                  error={errors.observation}
                  isFile
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
