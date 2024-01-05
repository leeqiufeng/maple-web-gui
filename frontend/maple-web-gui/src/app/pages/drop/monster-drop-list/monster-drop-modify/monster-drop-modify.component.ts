import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MonsterDropService } from 'src/app/services/monster-drop.service';
import { ItemSelectorComponent } from '../../item-selector/item-selector.component';

@Component({
  selector: 'app-monster-drop-modify',
  templateUrl: './monster-drop-modify.component.html',
  styleUrls: ['./monster-drop-modify.component.scss']
})
export class MonsterDropModifyComponent implements OnInit {

  @Input()
  currentId?: number;

  public currentObj?: NzSafeAny;

  public validateForm!: FormGroup;

  public isQuest: boolean = false;

  constructor(private fb: FormBuilder,
    private modal: NzModalService,
    private service: MonsterDropService) {

  }

  ngOnInit(): void {
    this.init();
    if (this.currentId) {
      this.fetchData();
    }
  }

  private init() {
    this.validateForm = this.fb.group({
      dropperId: [null, [Validators.required]],
      dropperName: [null, [Validators.required]],
      itemName: [null, [Validators.required]],
      itemId: [null, [Validators.required]],
      minimumQuantity: [1, [Validators.required]],
      maximumQuantity: [1, [Validators.required]],
      questId: new FormControl({ value: -1, disabled: true }, {
        updateOn: "blur",
        validators: [Validators.pattern(/[0-9]+/)]
      }),
      chance: [100, [Validators.required]]
    });
  }

  public fetchData() {
    this.service.fetchOne(this.currentId || 0)
      .subscribe((ret: any) => {
        if (ret.code == 200) {
          const data = ret.data;
          this.currentObj = data;
          this.validateForm.addControl("id", new FormControl({ value: data.id }));
          const { chance, ...otders } = data;
          this.validateForm.patchValue(otders);
          // 掉落概率需要单独处理
          const temp = Math.min(chance / 1000000 * 100 * 1, 100);
          this.validateForm.patchValue({
            chance: Math.round(temp * 100.0) / 100.0
          });
          if (data.questId > 0) {
            this.isQuest = true;
            this.validateForm.get("questId")?.enable();
          }
        }
      });
  }

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');

  public onIsQuestModelChange(val: boolean) {
    if (!val) {
      this.validateForm.get("questId")?.disable();
      this.validateForm.patchValue({
        questId: -1
      })
    } else {
      this.validateForm.get("questId")?.enable();
    }
  }

  public openSelector() {
    const modal: NzModalRef = this.modal.create({
      nzTitle: '选择物品',
      nzContent: ItemSelectorComponent,
      nzWidth: 1000,
      nzFooter: null
    });
    modal.afterClose
      .subscribe(ret => {
        if (ret) {
          this.validateForm.patchValue({
            itemId: ret.itemId
          });
          this.currentObj.itemName = ret.itemName;
        }
      })
  }
}
