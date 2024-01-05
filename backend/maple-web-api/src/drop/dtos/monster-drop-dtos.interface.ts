import { BaseQueryParams } from "src/core/dtos/BaseQueryParams";

export interface MonsterDropDto {
  id?: number;

  dropperId: number;

  dropperName?: string;

  itemId: number;

  itemName?: string;

  minimumQuantity: number;

  maximumQuantity: number;

  questId: number;

  chance: number;
}

export interface MonsterDropQueryParams extends BaseQueryParams {
  key?: string;
}

export interface MonsterDropDetailQueryParams extends BaseQueryParams {
  type: number;
  id: number;
}