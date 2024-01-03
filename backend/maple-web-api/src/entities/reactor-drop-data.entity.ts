import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "reactordrops" })
export class ReactorDropData {

  @PrimaryGeneratedColumn({ name: "reactordropid" })
  id: number;

  @Column({ name: "reactorid" })
  reactorId: number;

  @Column({ name: "itemid" })
  itemId: number;

  @Column({ name: "questid" })
  questId: number;

  @Column({ name: "chance" })
  chance: number;
}