import { Animal, AnimalSubtype, AnimalType } from "../entities/Animal";
import bird from "../images/animals/bird.png";
import cat from "../images/animals/cat.png";
import cow from "../images/animals/cow.png";
import dog from "../images/animals/dog.png";
import donkey from "../images/animals/donkey.png";
import ewe from "../images/animals/ewe.png";
import ferret from "../images/animals/ferret.png";
import goat from "../images/animals/goat.png";
import guineaPig from "../images/animals/guinea-pig.png";
import horse from "../images/animals/horse.png";
import rabbit from "../images/animals/rabbit.png";
import snake from "../images/animals/snake.png";

const getAnimalSubtypeImageSrc = (animalSubtype: AnimalSubtype) => {
  switch (animalSubtype) {
    case AnimalSubtype.RABBIT:
      return rabbit;
    case AnimalSubtype.GUINEA_PIG:
      return guineaPig;
    case AnimalSubtype.FERRET:
      return ferret;
    case AnimalSubtype.SNAKE:
      return snake;
    case AnimalSubtype.BIRD:
      return bird;
    default:
      return undefined;
  }
};

export const getAnimalImageSrc = (animal: Animal): string | undefined => {
  switch (animal.type as AnimalType) {
    case AnimalType.HORSE:
      return horse;
    case AnimalType.COW:
      return cow;
    case AnimalType.DOG:
      return dog;
    case AnimalType.CAT:
      return cat;
    case AnimalType.GOAT:
      return goat;
    case AnimalType.EWE:
      return ewe;
    case AnimalType.DONKEY:
      return donkey;
    case AnimalType.NAC:
      return getAnimalSubtypeImageSrc(animal.subtype as AnimalSubtype);
    default:
      return undefined;
  }
};
