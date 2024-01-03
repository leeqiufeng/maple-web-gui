import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "wz_npc " })
export class NpcEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;
}