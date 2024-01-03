import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseService, BASE_PATH } from 'src/app/core/base-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalDropService extends BaseService {

  constructor(private http: HttpClient,
    @Inject(BASE_PATH) basePath: string) {
    super(http, basePath);
  }

  fetchByPage(data?: NzSafeAny) {
    return this.POST("global-drop/list", data);
  }

  add(data?: NzSafeAny) {
    return this.POST("global-drop/add", data);
  }

  modify(data?: NzSafeAny) {
    return this.POST("global-drop/modify", data);
  }

  delete(id: number) {
    return this.GET(`global-drop/delete?id=${id}`);
  }
}
