import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "wz_quest" })
export class QuestEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;
}