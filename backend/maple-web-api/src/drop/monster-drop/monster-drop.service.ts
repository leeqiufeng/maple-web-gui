import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base-service';
import { BaseListResult } from 'src/core/dtos/BaseListResult';
import { MonsterDropData } from 'src/entities/monster-drop-data.entity';
import { Equal, FindOptionsWhere, Like, Repository } from 'typeorm';
import { MonsterDropDetailQueryParams, MonsterDropQueryParams } from '../dtos/monster-drop-dtos.interface';

@Injectable()
export class monsterDropService extends BaseService<MonsterDropData, MonsterDropQueryParams>{

  public buildWhereOpts<T>(params: MonsterDropQueryParams): FindOptionsWhere<T> {
    let condition: any[] = [];
    if (params.key) {
      condition.push({ itemId: Like(`%${params.key}%`) });
      condition.push({ itemName: Like(`%${params.key}%`) });
      condition.push({ dropperId: Like(`%${params.key}%`) });
      condition.push({ dropperName: Like(`%${params.key}%`) });
    }
    return condition as FindOptionsWhere<T>;
  }

  constructor(
    @InjectRepository(MonsterDropData)
    private _repository: Repository<MonsterDropData>,
  ) {
    super(_repository);
  }

  public fetchDetail(params: MonsterDropDetailQueryParams) {
    return new Promise<BaseListResult<MonsterDropData>>((resolve, reject) => {
      let condition = {};
      condition = params.type == 1 ? { itemId: Equal(params.id) } : { dropperId: params.id };
      this._repository.countBy(condition)
        .then(total => {
          this._repository.find({
            skip: (params.pageIndex - 1) * params.pageSize,
            take: params.pageSize,
            where: condition
          }).then(data => {
            resolve({
              total: total,
              items: data
            })
          }).catch(err => {
            reject(new HttpException("查询数据发生错误", HttpStatus.INTERNAL_SERVER_ERROR));
          });
        });
    });
  }
}
