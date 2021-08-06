import { Formik } from "formik";
import { AnimalSubtype, AnimalType } from "../entities/Animal";
import { AnimalSchema, AnimalValues } from "../schemas/animalSchema";
import animalService from "../services/animalService";
import { translateMessage } from "../utils/responseMessage";
import Input from "./Input";
import Message, { MessageType } from "./Message";
import Modal from "./Modal";
import { ActionType, useStore } from "./Store";

type AnimalModalProps = {
  isVisible: boolean;
  close: () => void;
  formValues: AnimalValues;
  refreshView: (animal: AnimalValues) => void;
  clientId: number | undefined;
};

const AnimalModal = ({
  isVisible,
  close,
  formValues,
  refreshView,
  clientId,
}: AnimalModalProps) => {
  const [, dispatch] = useStore();

  const submitForm = async (values: AnimalValues) => {
    if (clientId) {
      const response = formValues.id
        ? await animalService.edit(clientId, values)
        : await animalService.create(clientId, values);

      if (response.ok) {
        if (!values.id) {
          const jsonResponse = await response.json();
          values.id = jsonResponse.animal.id;
        }
        refreshView(values);
        close();
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
    }
  };

  return isVisible ? (
    <Modal
      close={close}
      title={formValues.id ? "Modifier animal" : "Ajouter un animal"}
    >
      <Formik
        initialValues={formValues}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={AnimalSchema}
        onSubmit={submitForm}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            <Message />
            <Input
              id="name"
              label="Nom"
              type="text"
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              isRequired
            />
            <Input
              select={AnimalType}
              id="type"
              label="Type"
              onChange={handleChange}
              value={values.type}
              error={errors.type}
              isRequired
            />
            <Input
              select={AnimalSubtype}
              id="subtype"
              label="Animal NAC"
              onChange={handleChange}
              value={values.subtype}
              error={errors.subtype}
              isDisabled={values.type !== AnimalType.NAC}
              isRequired={values.type === AnimalType.NAC}
            />
            <Input
              id="sex"
              label="Sexe"
              type="text"
              onChange={handleChange}
              value={values.sex}
              error={errors.sex}
              isRequired
            />
            <Input
              id="breed"
              label="Race"
              onChange={handleChange}
              value={values.breed}
              error={errors.breed}
              isRequired
            />
            <div className="center">
              <button
                className="primary"
                type="submit"
                disabled={
                  formValues.id !== undefined &&
                  JSON.stringify(values) === JSON.stringify(formValues)
                }
              >
                {formValues.id ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  ) : null;
};

export default AnimalModal;
