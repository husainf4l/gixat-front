import { Component, OnDestroy, OnInit } from '@angular/core';
import { Board } from '../services/board.model';
import { BoardService } from '../services/board.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray,DragDropModule } from '@angular/cdk/drag-drop';
import { BoardDialogComponent } from '../dialogs/board-dialog/board-dialog.component';
import { BoardComponent } from "../board/board.component";
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-boards-list',
  standalone: true,
  imports: [BoardComponent,MatIconModule,DragDropModule],
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  subscription: Subscription = new Subscription();

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const boardsObservable = this.boardService.getUserBoards();
    
    // Ensure getUserBoards() returns an Observable before subscribing
    if (boardsObservable) {
      this.subscription = boardsObservable.subscribe((boards: Board[]) => {
        this.boards = boards;
      });
    }
  }

  drop(event: CdkDragDrop<Board[]>): void {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards.length
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
