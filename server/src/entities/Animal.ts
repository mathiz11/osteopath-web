import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Card } from "./Card";
import { Client } from "./Client";

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

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: "enum",
    enum: AnimalType,
  })
  type: AnimalType;

  @Column({
    type: "enum",
    enum: AnimalSubtype,
    nullable: true,
  })
  subtype: AnimalSubtype;

  @Column({ length: 100 })
  sex: string;

  @Column({ length: 100 })
  breed: string;

  @Column({ name: "client_id" })
  clientId: number;

  @ManyToOne(() => Client, (client) => client.animals, { onDelete: "CASCADE" })
  client: Client;

  @OneToMany(() => Card, (card) => card.animal)
  cards: Card[];
}
