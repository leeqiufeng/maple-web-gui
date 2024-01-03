import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropRoutingModule } from './drop-routing.module';
import { GlobalDropListComponent } from './global-drop-list/global-drop-list.component';
import { MonsterDropListComponent } from './monster-drop-list/monster-drop-list.component';
import { ReactorDropListComponent } from './reactor-drop-list/reactor-drop-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MonsterDropModifyComponent } from './monster-drop-list/monster-drop-modify/monster-drop-modify.component';


@NgModule({
  declarations: [
    GlobalDropListComponent,
    MonsterDropListComponent,
    ReactorDropListComponent,
    MonsterDropModifyComponent
  ],
  imports: [
    CommonModule,    
    DropRoutingModule,
    SharedModule
  ]
})
export class DropModule { }
