import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BaseService, BASE_PATH } from '../core/base-service';

@Injectable({
  providedIn: 'root'
})
export class WzConsumeService extends BaseService {

  constructor(private http: HttpClient,
    @Inject(BASE_PATH) basePath: string) {
    super(http, basePath);
  }

  fetchByPage(data?: NzSafeAny) {
    return this.POST("consume/list", data);
  }
}
