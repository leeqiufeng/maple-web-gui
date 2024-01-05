import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "wz_consume" })
export class WzConsume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "item_id" })
  itemId: number;

  @Column({ name: "item_name" })
  itemName: string;
}