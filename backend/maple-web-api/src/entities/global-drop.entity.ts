import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "drop_data_global" })
export class GlobalDrop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "itemid" })
  itemId: number;
  
  @Column({ name: "item_name" })
  itemName?: string;

  @Column({ name: "continent" })
  continent: number;

  @Column({ name: "minimum_quantity" })
  minimumQuantity: number;

  @Column({ name: "maximum_quantity" })
  maximumQuantity: number;

  @Column({ name: "questid" })
  questId: number;

  @Column({ name: "chance" })
  chance: number;

  @Column({ name: "comments" })
  comments: string;
}