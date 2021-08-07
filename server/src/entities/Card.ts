import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Animal } from "./Animal";

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  creationDate: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  modificationDate: Date;

  @Column({ type: "smallint" })
  age: number;

  @Column()
  isCastrated: boolean;

  @Column({ type: "text", nullable: true })
  diet: string;

  @Column({ type: "smallint" })
  score: number;

  @Column({ type: "text", nullable: true })
  discipline: string;

  @Column({ type: "text", nullable: true })
  lifestyle: string;

  @Column({ type: "text", nullable: true })
  antecedent: string;

  @Column({ length: 100, nullable: true })
  dewormer: string;

  @Column({ type: "text", nullable: true })
  vaccine: string;

  @Column({ type: "text", nullable: true })
  marshal: string;

  @Column({ type: "text", nullable: true })
  dentistry: string;

  @Column({ type: "text", nullable: true })
  observation: string;

  @Column({ nullable: true })
  schemaURL: string;

  @Column({ type: "text", nullable: true })
  conclusion: string;

  @Column({ type: "text", nullable: true })
  treatment: string;

  @Column({ length: 100, nullable: true })
  restTime: string;

  @Column({ length: 100, nullable: true })
  activityRetake: string;

  @ManyToOne(() => Animal, (animal) => animal.cards, { onDelete: "CASCADE" })
  animal: Animal;
}
