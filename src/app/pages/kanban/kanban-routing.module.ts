import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { KanbanComponent } from './kanban.component';

const routes: Routes = [
  { path: '', component: KanbanComponent,
    children:[
      { path: '', component: BoardsListComponent },

    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
