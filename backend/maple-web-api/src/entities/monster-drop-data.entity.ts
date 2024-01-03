import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "drop_data" })
export class MonsterDropData extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "dropperid" })
  dropperId: number;

  @Column({ name: "dropper_name" })
  dropperName?: string;

  @Column({ name: "itemid" })
  itemId: number;

  @Column({ name: "item_name" })
  itemName?: string;

  @Column({ name: "minimum_quantity" })
  minimumQuantity: number;

  @Column({ name: "maximum_quantity" })
  maximumQuantity: number;

  @Column({ name: "questid" })
  questId: number;

  @Column({ name: "chance" })
  chance: number;
}
