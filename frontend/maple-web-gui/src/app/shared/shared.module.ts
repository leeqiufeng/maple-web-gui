import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../icons-provider.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DropChancePipe } from './pipes/drop-chance.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

const NG_ANTD_MOD = [
  IconsProviderModule,
  NzLayoutModule,
  NzMenuModule,
  NzDividerModule,
  NzGridModule,
  NzSpaceModule,
  NzPaginationModule,
  NzTableModule,
  NzTypographyModule,
  NzButtonModule,
  NzInputModule,
  NzModalModule,
  NzFormModule
];

@NgModule({
  declarations: [DropChancePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...NG_ANTD_MOD
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...NG_ANTD_MOD,
    DropChancePipe
  ]
})
export class SharedModule { }
