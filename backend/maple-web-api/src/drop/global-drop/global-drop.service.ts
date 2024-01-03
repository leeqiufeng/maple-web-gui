import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseListResult } from 'src/core/dtos/BaseListResult';
import { GlobalDrop } from 'src/entities/global-drop.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { GlobalDropQueryParams } from '../dtos/global-drop-dtos.interface';

@Injectable()
export class GlobalDropService {
  constructor(
    @InjectRepository(GlobalDrop)
    private repository: Repository<GlobalDrop>,
  ) { }

  public fetch(params: GlobalDropQueryParams): Promise<BaseListResult<GlobalDrop>> {
    return new Promise<BaseListResult<GlobalDrop>>((resolve, reject) => {
      let condition: any[] = [];
      if (params.key) {
        condition.push({ itemId: Like(`%${params.key}%`) });
        condition.push({ itemName: Like(`%${params.key}%`) });
        condition.push({ comments: Like(`%${params.key}%`) });
      }
      this.repository.countBy(condition)
        .then(total => {
          this.repository.find({
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

  public add(data: GlobalDrop): Promise<GlobalDrop> {
    return this.repository.save(data);
  }

  public edit(data: GlobalDrop): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.repository.createQueryBuilder()
        .update(data)
        .where("id = :id", { id: data.id })
        .execute()
        .then(res => {
          if (res.affected && res.affected > 0) {
            resolve(true);
          } else {
            reject(new HttpException("更新数据发生错误", HttpStatus.INTERNAL_SERVER_ERROR));
          }
        });
    });
  }

  public delete(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.repository.createQueryBuilder()
        .delete()
        .where("id = :id", { id: id })
        .execute()
        .then(res => {
          if (res.affected && res.affected > 0) {
            resolve(true);
          } else {
            reject(new HttpException("删除数据发生错误", HttpStatus.INTERNAL_SERVER_ERROR));
          }
        });
    });
  }
}
