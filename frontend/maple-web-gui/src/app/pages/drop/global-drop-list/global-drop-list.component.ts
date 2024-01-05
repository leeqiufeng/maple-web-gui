import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize, takeUntil } from 'rxjs';
import { BaseQueryParams } from 'src/app/core/base-query-params';
import { BaseTable } from '../../../core/base-table';
import { GlobalDrop } from '../../../core/entities';
import { GlobalDropService } from '../../../services/global-drop.service';

@Component({
  selector: 'app-global-drop-list',
  templateUrl: './global-drop-list.component.html',
  styleUrls: ['./global-drop-list.component.scss']
})
export class GlobalDropListComponent extends BaseTable<GlobalDrop, BaseQueryParams> implements OnInit {


  constructor(
    private modal: NzModalService,
    private service: GlobalDropService) {
    super(modal);
  }

  ngOnInit(): void {
    this.refresh();
  }

  public load(callback: () => void): void {
    this.service.fetchByPage(this.$params)
      .pipe(takeUntil(this.$destroy), finalize(() => callback()))
      .subscribe((res: any) => {
        this.data = res.data.items;
        this.total = res.data.total;
      })
  }

  public remove(id: number): void {
    this.service.delete(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: any) => {
        if (res.code == 200) {
          console.log(res);
          this.refresh();
        }
      });
  }
}
