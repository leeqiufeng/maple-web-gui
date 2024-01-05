import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseService, BASE_PATH } from 'src/app/core/base-service';

@Injectable({
  providedIn: 'root'
})
export class MonsterDropService extends BaseService {

  constructor(private http: HttpClient,
    @Inject(BASE_PATH) basePath: string) {
    super(http, basePath);
  }

  fetchByPage(data?: NzSafeAny) {
    return this.POST("monster-drop/list", data);
  }

  fetchOne(id: number) {
    return this.GET(`monster-drop?id=${id}`);
  }

  fetchDetail(data?: NzSafeAny) {
    return this.POST("monster-drop/detail", data)
  }
}
