import { Formik } from "formik";
import { ClientSchema, ClientValues } from "../schemas/clientSchema";
import clientService from "../services/clientService";
import { translateMessage } from "../utils/responseMessage";
import Input from "./Input";
import Message, { MessageType } from "./Message";
import Modal from "./Modal";
import { ActionType, useStore } from "./Store";

type ClientModalProps = {
  isVisible: boolean;
  close: () => void;
  formValues: ClientValues;
  refreshView: () => void;
};

const ClientModal = ({
  isVisible,
  close,
  formValues,
  refreshView,
}: ClientModalProps) => {
  const [, dispatch] = useStore();

  return isVisible ? (
    <Modal
      close={close}
      title={formValues.id ? "Modifier client" : "Ajouter un client"}
    >
      <Formik
        initialValues={formValues}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={ClientSchema}
        onSubmit={async (values) => {
          const response = formValues.id
            ? await clientService.edit(values)
            : await clientService.create(values);

          if (response.ok) {
            refreshView();
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
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            <Message />
            <Input
              id="firstname"
              label="Prénom"
              type="text"
              onChange={handleChange}
              value={values.firstname}
              error={errors.firstname}
              isRequired
            />
            <Input
              id="lastname"
              label="Nom"
              type="text"
              onChange={handleChange}
              value={values.lastname}
              error={errors.lastname}
              isRequired
            />
            <Input
              id="email"
              label="Email"
              type="text"
              onChange={handleChange}
              value={values.email}
              error={errors.email}
              isRequired
            />
            <Input
              id="phone"
              label="Téléphone"
              type="text"
              onChange={handleChange}
              value={values.phone}
              error={errors.phone}
              isRequired
            />
            <Input
              isTextArea
              id="address"
              label="Adresse"
              onChange={handleChange}
              value={values.address}
              error={errors.address}
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

export default ClientModal;
