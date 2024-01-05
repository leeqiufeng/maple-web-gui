import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { finalize, takeUntil } from 'rxjs';
import { BaseTable } from 'src/app/core/base-table';
import { WzConsumeService } from 'src/app/services/wz-consume.service';

@Component({
  selector: 'app-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.scss']
})
export class ItemSelectorComponent extends BaseTable<any, any> implements OnInit {


  public itemType: number = 2;

  constructor(
    private modal: NzModalService,
    private modalRef: NzModalRef,
    private service: WzConsumeService) {
    super(modal);
  }

  ngOnInit(): void {
    this.refresh();
  }

  public load(callback: () => void): void {
    this.service.fetchByPage(this.$params)
      .pipe(takeUntil(this.$destroy), finalize(() => callback()))
      .subscribe((ret: any) => {
        if (ret.code == 200) {
          const data = ret.data;
          this.total = data.total;
          this.data = data.items || [];
        }
      });
  }

  public remove(id: number): void {
  }

  public onSelected(item: any) {
    this.modalRef.destroy(item);
  }
}
