// src/app/pages/kanban/kanban.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanRoutingModule } from './kanban-routing.module';

@NgModule({
  imports: [
    CommonModule,
    KanbanRoutingModule
  ]
})
export class KanbanModule { }
