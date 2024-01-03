import { HttpException, HttpStatus } from "@nestjs/common";
import { Equal, FindOptionsWhere, Repository } from "typeorm";
import { BaseListResult } from "./dtos/BaseListResult";
import { BaseQueryParams } from "./dtos/BaseQueryParams";
import { SelfBaseEntity } from "./self-base-entity";

export abstract class BaseService<T extends SelfBaseEntity, K extends BaseQueryParams> {

  constructor(
    private repository: Repository<T>,
  ) { }

  /**
   * 抽象查询条件生成的方法
   */
  public abstract buildWhereOpts<T>(params: K): FindOptionsWhere<T>;

  public fetch(params: K): Promise<BaseListResult<T>> {
    return new Promise<BaseListResult<T>>((resolve, reject) => {
      let condition = this.buildWhereOpts(params);
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

  public add(params: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.repository.save(params)
        .then(ret => {
          if (ret) {
            resolve(ret);
          } else {
            reject(new HttpException(`新增数据发生错误`, HttpStatus.INTERNAL_SERVER_ERROR));
          }
        }).catch(err => {
          reject(new HttpException(`新增数据发生错误, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR));
        });
    });
  }

  public edit(data: T): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let condition: any = {
        id: Equal(data.id)
      };
      this.repository.update(data.id, data as any)
        .then(res => {
          if (res) {
            resolve(true);
          } else {
            reject(new HttpException("更新数据发生错误", HttpStatus.INTERNAL_SERVER_ERROR));
          }
        }).catch(err => {
          reject(new HttpException(`更新数据发生错误, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR));
        });;
    });
  }

  public delete(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let condition: any = {
        id: Equal(id)
      };
      this.repository.delete(condition)
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