import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { BoardService } from '../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { Task, Board } from '../services/board.model';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { DeleteButtonComponent } from "../shared/delete-button/delete-button.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DeleteButtonComponent, MatCardModule, MatIconModule, CommonModule, DragDropModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() board!: Board;

  constructor(private boardService: BoardService, private dialog: MatDialog) { }

  taskDrop(event: CdkDragDrop<Task[]>): void {
    const tasks = this.board.tasks || []; // Ensure tasks is always an array
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);

    // Update tasks in the backend after reordering
    this.boardService.updateTasks(this.board.id, tasks).subscribe({
      next: () => console.log('Tasks reordered successfully'),
      error: (err) => console.error('Error reordering tasks:', err)
    });
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const tasks = [...(this.board.tasks || [])]; // Spread an empty array if tasks is undefined
        if (result.isNew) {
          tasks.push(result.task);
        } else if (typeof result.idx === 'number') {
          tasks.splice(result.idx, 1, result.task);
        }

        // Update tasks in the backend after dialog changes
        this.boardService.updateTasks(this.board.id, tasks).subscribe({
          next: () => {
            this.board.tasks = tasks; // Update the board's tasks after successful update
            console.log('Task updated successfully');
          },
          error: (err) => console.error('Error updating task:', err)
        });
      }
    });
  }

  handleDelete(): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this board?');
    if (confirmDelete) {
      this.boardService.deleteBoard(this.board.id).subscribe({
        next: () => console.log('Board deleted successfully'),
        error: (err) => console.error('Error deleting board:', err)
      });
    }
  }
}
