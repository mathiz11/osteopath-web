import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";

export type LighterUser = {
  id: string;
  tokenVersion?: string;
};

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ name: "number_OA", length: 30, nullable: true })
  numberOA: string;

  @Column({ length: 10, nullable: true })
  phone: string;

  @Column({ type: "text", nullable: true })
  address: string;

  @Column({ name: "token_version", type: "int", default: 0 })
  tokenVersion: number;

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];
}
