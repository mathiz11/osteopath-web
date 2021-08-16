import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { Link, useHistory, useParams } from "react-router-dom";
import AnimalAlert from "../components/AnimalAlert";
import AnimalModal from "../components/AnimalModal";
import CardAlert from "../components/CardAlert";
import CardList from "../components/CardList";
import Layout from "../components/Layout";
import { Animal } from "../entities/Animal";
import { AnimalValues, DEFAULT_ANIMAL_VALUES } from "../schemas/animalSchema";
import { CardValues } from "../schemas/cardSchema";
import animalService from "../services/animalService";
import "../styles/AnimalPage.css";
import { getAnimalImageSrc } from "../utils/animals";

type Params = {
  clientId: string;
  animalId: string;
};

const AnimalPage = () => {
  const [animal, setAnimal] = useState<Animal | undefined>();
  const [showAnimalModal, setShowAnimalModal] = useState<boolean>(false);
  const [showAnimalAlert, setShowAnimalAlert] = useState<boolean>(false);
  const [cardAlert, setCardAlert] = useState<number | undefined>();
  const [animalformValues, setAnimalFormValues] = useState<AnimalValues>(
    DEFAULT_ANIMAL_VALUES
  );

  let history = useHistory();
  const { clientId, animalId } = useParams<Params>();

  useEffect(() => {
    getAnimal();
  }, []);

  const getAnimal = async () => {
    const response = await animalService.getOne(+clientId, +animalId);
    const jsonResponse = await response.json();
    setAnimal(jsonResponse.animal);
  };

  const updateAnimal = (updatedAnimal: AnimalValues) => {
    if (animal) {
      setAnimal({ ...(updatedAnimal as Animal), cards: animal.cards });
    }
  };

  const deleteAnimal = async () => {
    const response = await animalService.remove(+clientId, +animalId);

    if (response.ok) {
      closeAnimalAlert();
      history.push("/client/" + clientId);
    }
  };

  const deleteCard = async () => {
    if (animal?.id && cardAlert) {
      console.log("delete card");
      // const response = await cardService.remove(client.id, animalAlert);

      // if (response.ok) {
      //   setClient({
      //     ...client,
      //     animals: client.animals.filter((animal) => animal.id !== animalAlert),
      //   });
      //   closeAnimalAlert();
      // }
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

  const openCardEdition = (cardId: number | undefined) => {
    if (cardId && animal) {
      history.push({
        pathname: `/client/${clientId}/animal/${animalId}/card/edit/${cardId}`,
        state: {
          formValues: animal.cards
            .filter((card) => card.id === cardId)
            .pop() as CardValues,
        },
      });
    }
  };

  const openCardAlertToDelete = (cardId: number | undefined) => {
    if (cardId) {
      setCardAlert(cardId);
    }
  };

  const closeCardAlert = () => setCardAlert(undefined);

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
                <Link
                  to={`/client/${clientId}/animal/${animalId}/card/new`}
                  className="primary"
                >
                  <FaPlus />
                  <span>Ajouter</span>
                </Link>
              </div>
              <CardList
                cards={animal.cards}
                editEvent={openCardEdition}
                deleteEvent={openCardAlertToDelete}
              />
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
            clientId={+clientId}
          />
          <CardAlert
            isVisible={cardAlert !== undefined}
            cardNumber={
              animal?.cards.filter((card) => card.id === cardAlert).pop()?.id
            }
            closeEvent={closeCardAlert}
            confirmEvent={deleteCard}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AnimalPage;
