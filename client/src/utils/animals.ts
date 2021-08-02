import { Animal, AnimalSubtype, AnimalType } from "../entities/Animal";

const getAnimalSubtypeImageSrc = (animalSubtype: AnimalSubtype) => {
  switch (animalSubtype) {
    case AnimalSubtype.RABBIT:
      return "../images/animals/rabbit.png";
    case AnimalSubtype.GUINEA_PIG:
      return "../images/animals/guinea-pig.png";
    case AnimalSubtype.FERRET:
      return "../images/animals/ferret.png";
    case AnimalSubtype.SNAKE:
      return "../images/animals/snake.png";
    case AnimalSubtype.BIRD:
      return "../images/animals/bird.png";
    default:
      return "";
  }
};

export const getAnimalImageSrc = (animal: Animal): string => {
  let src = null;

  switch (animal?.type) {
    case AnimalType.HORSE:
      src = "../images/animals/horse.png";
      break;
    case AnimalType.COW:
      src = "../images/animals/cow.png";
      break;
    case AnimalType.DOG:
      src = "../images/animals/dog.png";
      break;
    case AnimalType.CAT:
      src = "../images/animals/cat.png";
      break;
    case AnimalType.GOAT:
      src = "../images/animals/goat.png";
      break;
    case AnimalType.EWE:
      src = "../images/animals/ewe.png";
      break;
    case AnimalType.DONKEY:
      src = "../images/animals/donkey.png";
      break;
    case AnimalType.NAC:
      src = getAnimalSubtypeImageSrc(animal.subtype);
      break;
    default:
      src = "";
  }

  return src;
};
