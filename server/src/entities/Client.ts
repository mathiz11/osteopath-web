import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Animal } from "./Animal";
import { User } from "./User";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ type: "text" })
  address: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @OneToMany(() => Animal, (animal) => animal.owner)
  animals: Animal[];
}
