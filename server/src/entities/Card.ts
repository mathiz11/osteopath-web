import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Animal } from "./Animal";
import { File } from "./File";

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  date: Date;

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

  @OneToOne(() => File)
  @JoinColumn()
  schema: File;

  @Column({ type: "text", nullable: true })
  conclusion: string;

  @Column({ type: "text", nullable: true })
  treatment: string;

  @Column({ length: 100, nullable: true })
  restTime: string;

  @Column({ length: 100, nullable: true })
  activityRetake: string;

  @ManyToOne(() => Animal, (animal) => animal.cards)
  animal: Animal;
}
