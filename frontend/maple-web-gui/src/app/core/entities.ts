export interface GlobalDrop {
  id: number;

  itemId: number;

  itemName?: string;

  continent: number;

  minimumQuantity: number;

  maximumQuantity: number;

  questId: number;

  chance: number;

  comments?: string;
}

export interface MonsterDropData {
  id: number;

  dropperId: number;

  dropperName?: string;

  itemId: number;

  itemName?: string;

  minimumQuantity: number;

  maximumQuantity: number;

  questId: number;

  chance: number;
}