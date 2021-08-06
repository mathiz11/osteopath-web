import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import AnimalAlert from "../components/AnimalAlert";
import AnimalModal from "../components/AnimalModal";
import Layout from "../components/Layout";
import { Animal } from "../entities/Animal";
import { AnimalValues, DEFAULT_ANIMAL_VALUES } from "../schemas/animalSchema";
import animalService from "../services/animalService";
import "../styles/AnimalPage.css";
import { getAnimalImageSrc } from "../utils/animals";

const AnimalPage = ({ match }: any) => {
  const [animal, setAnimal] = useState<Animal | undefined>();
  const [showAnimalModal, setShowAnimalModal] = useState<boolean>(false);
  const [showAnimalAlert, setShowAnimalAlert] = useState<boolean>(false);
  const [animalformValues, setAnimalFormValues] = useState<AnimalValues>(
    DEFAULT_ANIMAL_VALUES
  );
  const history = useHistory();

  useEffect(() => {
    getAnimal();
  }, []);

  const getAnimal = async () => {
    const { clientId, animalId } = match.params;
    if (clientId && animalId) {
      const response = await animalService.getOne(clientId, animalId);
      const jsonResponse = await response.json();
      setAnimal(jsonResponse.animal);
    }
  };

  const updateAnimal = (updatedAnimal: AnimalValues) => {
    if (animal) {
      setAnimal({ ...(updatedAnimal as Animal), cards: animal.cards });
    }
  };

  const deleteAnimal = async () => {
    const { clientId, animalId } = match.params;
    if (clientId && animalId) {
      const response = await animalService.remove(clientId, animalId);

      if (response.ok) {
        closeAnimalAlert();
        history.push("/client/" + clientId);
      }
    }
  };

  const openAnimalAlertToDelete = () => {
    setShowAnimalAlert(true);
  };

  const closeAnimalAlert = () => setShowAnimalAlert(false);

  const openAnimalModalToEdit = () => {
    setAnimalFormValues(animal as AnimalValues);
    setShowAnimalModal(true);
  };

  const closeAnimalModal = () => setShowAnimalModal(false);

  return (
    <Layout>
      <div className="animal">
        <div className="container">
          {animal && (
            <>
              <div className="animal-info">
                <img src={getAnimalImageSrc(animal)} alt={animal.type} />
                <h1>{animal.name}</h1>
                <span>{animal.breed}</span>
                <span>{animal.sex}</span>
                <div className="actions">
                  <button className="circle" onClick={openAnimalModalToEdit}>
                    <BsPencilSquare />
                  </button>
                  <button className="circle" onClick={openAnimalAlertToDelete}>
                    <BsTrash />
                  </button>
                </div>
              </div>
              <div className="header action-button">
                <h2>Fiches</h2>
                <button className="primary">
                  <FaPlus />
                  <span>Ajouter</span>
                </button>
              </div>
            </>
          )}
          <AnimalAlert
            isVisible={showAnimalAlert}
            animalName={animal?.name}
            closeEvent={closeAnimalAlert}
            confirmEvent={deleteAnimal}
          />
          <AnimalModal
            isVisible={showAnimalModal}
            close={closeAnimalModal}
            formValues={animalformValues}
            refreshView={updateAnimal}
            clientId={match.params.clientId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AnimalPage;
