import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalDropListComponent } from './global-drop-list/global-drop-list.component';
import { MonsterDropListComponent } from './monster-drop-list/monster-drop-list.component';
import { ReactorDropListComponent } from './reactor-drop-list/reactor-drop-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'global' },
  { path: 'global', component: GlobalDropListComponent },
  { path: 'monster', component: MonsterDropListComponent },
  { path: 'reactor', component: ReactorDropListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropRoutingModule { }
