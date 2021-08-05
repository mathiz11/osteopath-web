export enum AnimalType {
  HORSE = "Cheval",
  COW = "Vache",
  DOG = "Chien",
  CAT = "Chat",
  GOAT = "Chèvre",
  EWE = "Brebis",
  DONKEY = "Âne",
  NAC = "NAC",
}

export enum AnimalSubtype {
  RABBIT = "Lapin",
  GUINEA_PIG = "Cochon d'inde",
  FERRET = "Furet",
  SNAKE = "Serpent",
  BIRD = "Oiseau",
}

export type Animal = {
  id: number;
  name: string;
  type: string;
  subtype: string | null;
  sex: string;
  breed: string;
  clientId?: number;
  // cards: Card[];
};
