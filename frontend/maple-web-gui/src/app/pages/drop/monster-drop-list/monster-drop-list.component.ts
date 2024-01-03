import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseQueryParams } from 'src/app/core/base-query-params';
import { BaseTable } from 'src/app/core/base-table';
import { MonsterDropData } from 'src/app/core/entities';
import { finalize, takeUntil } from 'rxjs';
import { MonsterDropService } from '../services/monster-drop.service';
import { MonsterDropModifyComponent } from './monster-drop-modify/monster-drop-modify.component';

@Component({
  selector: 'app-monster-drop-list',
  templateUrl: './monster-drop-list.component.html',
  styleUrls: ['./monster-drop-list.component.scss']
})
export class MonsterDropListComponent extends BaseTable<MonsterDropData, BaseQueryParams> implements OnInit {

  constructor(
    private modal: NzModalService,
    private service: MonsterDropService) {
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

  }

  public openAddWin() {
    this.modal.create({
      nzTitle: "新增掉落",
      nzContent: MonsterDropModifyComponent
    });
  }

  public openModifyWin(id: number) {
    this.modal.create({
      nzTitle: `编辑掉落`,
      nzContent: MonsterDropModifyComponent
    });
  }
}
