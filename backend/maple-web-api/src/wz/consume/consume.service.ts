import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/base-service';
import { WzQueryParams } from 'src/drop/dtos/wz-dtos.interface';
import { WzConsume } from 'src/entities/wz-consume.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class ConsumeService extends BaseService<WzConsume, WzQueryParams>{

  public buildWhereOpts<T>(params: WzQueryParams): FindOptionsWhere<T> {
    let condition: any[] = [];
    if (params.key) {
      condition.push({ itemId: Like(`%${params.key}%`) });
      condition.push({ itemName: Like(`%${params.key}%`) });
    }
    return condition as FindOptionsWhere<T>;
  }

  constructor(
    @InjectRepository(WzConsume)
    private _repository: Repository<WzConsume>,
  ) {
    super(_repository);
  }
}
