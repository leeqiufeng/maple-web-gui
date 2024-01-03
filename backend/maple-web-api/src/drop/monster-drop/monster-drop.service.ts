import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base-service';
import { MonsterDropData } from 'src/entities/monster-drop-data.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { MonsterDropQueryParams } from '../dtos/monster-drop-dtos.interface';

@Injectable()
export class monsterDropService extends BaseService<MonsterDropData, MonsterDropQueryParams>{

  public buildWhereOpts<MonsterDropData>(params: MonsterDropQueryParams): FindOptionsWhere<MonsterDropData> {
    let condition: any[] = [];
    if (params.key) {
      condition.push({ itemId: Like(`%${params.key}%`) });
      condition.push({ itemName: Like(`%${params.key}%`) });
      condition.push({ dropperId: Like(`%${params.key}%`) });
      condition.push({ dropperName: Like(`%${params.key}%`) });
    }
    return condition as FindOptionsWhere<MonsterDropData>;
  }

  constructor(
    @InjectRepository(MonsterDropData)
    private _repository: Repository<MonsterDropData>,
  ) {
    super(_repository);
  }
}
