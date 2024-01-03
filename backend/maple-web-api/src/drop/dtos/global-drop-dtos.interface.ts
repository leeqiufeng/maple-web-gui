import { BaseQueryParams } from "src/core/dtos/BaseQueryParams";

export interface GlobalDropDto {

  id?: number;

  itemId: number;

  continent: number;

  minimumQuantity: number;

  maximumQuantity: number;

  questId: number;

  chance: number;

  comments: string;
}

export interface GlobalDropQueryParams extends BaseQueryParams {
  key?: string;
}