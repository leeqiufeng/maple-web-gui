import { NzModalService } from "ng-zorro-antd/modal";
import { Subject } from "rxjs";
import { BaseQueryParams } from "./base-query-params";

export abstract class BaseTable<T, K extends BaseQueryParams> {

  protected $destroy = new Subject();

  public _pageSize: number = 10;
  public _pageIndex: number = 1;

  public $params!: K;
  public total: number = 0;
  public data: T[] = [];
  public loading: boolean = false;

  constructor(private _modal: NzModalService) {
    this.$params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    } as K;
  }

  public abstract load(callback: () => void): void;
  public abstract remove(id: number): void;

  get pageIndex(): number {
    return this._pageIndex;
}

set pageIndex(val: number) {
    this._pageIndex = val;
}

get pageSize(): number {
    return this._pageSize;
}

set pageSize(val: number) {
    this._pageSize = val;
}

  public list(): void {
    this.$params.pageSize = this.pageSize;
    this.$params.pageIndex = this.pageIndex;
    this.loading = true;
    this.load(() => {
      this.loading = false;
    });
  }

  public refresh(): void {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.list();
  }

  public onPageIndexChange(index: number) {
    this.pageIndex = index;
    this.list();
  }



  public onDelete(id: number) {
    this._modal.confirm({
      nzTitle: "是否确认删除当前选择项 ?",
      nzOnOk: () => {
        this.remove(id);
      }
    });
  }
}