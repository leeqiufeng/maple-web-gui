import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseQueryParams } from 'src/app/core/base-query-params';
import { BaseTable } from 'src/app/core/base-table';
import { MonsterDropData } from 'src/app/core/entities';
import { finalize, takeUntil } from 'rxjs';
import { MonsterDropService } from 'src/app/services/monster-drop.service';

@Component({
  selector: 'app-item-drop-detail',
  templateUrl: './item-drop-detail.component.html',
  styleUrls: ['./item-drop-detail.component.scss']
})
export class ItemDropDetailComponent extends BaseTable<MonsterDropData, BaseQueryParams> implements OnInit {

  @Input()
  checkType: number = 0; // 查询类型(0-指定怪物所有掉落,1-指定物品产生掉落的所有怪物)
  @Input()
  targetId!: number;

  constructor(
    private modal: NzModalService,
    private service: MonsterDropService) {
    super(modal);
  }

  ngOnInit(): void {
    this.refresh();
  }

  public load(callback: () => void): void {
    this.service.fetchDetail(Object.assign({}, this.$params, { type: this.checkType, id: this.targetId }))
      .pipe(takeUntil(this.$destroy), finalize(() => callback()))
      .subscribe((res: any) => {
        this.data = res.data.items;
        this.total = res.data.total;
      })
  }

  public remove(id: number): void {
  }
}
