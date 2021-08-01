import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;
}
