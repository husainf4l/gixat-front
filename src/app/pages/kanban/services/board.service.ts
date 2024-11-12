import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, Task } from './board.model'; // Adjust based on your actual file structure

import io from 'socket.io-client';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private socket: ReturnType<typeof io>; // Use `ReturnType<typeof io>` to infer the type

  constructor() {
    // Establish a connection to the WebSocket server
    this.socket = io(environment.apiUrl); // Correct usage of `io` as a function
  }

  /**
   * Emit request to create a new board for the current user
   */
  createBoard(data: { companyId: string; title: string }): void {
    this.socket.emit('createBoard', data);
  }

  /**
   * Get all boards owned by the current user
   */
  getBoards(companyId: string): Observable<Board[]> {
    this.socket.emit('getBoards', { companyId });
    return new Observable(observer => {
      this.socket.on('boardsUpdated', (data: Board[]) => observer.next(data));
    });
  }

  /**
   * Sort boards by updating their priority
   */
  sortBoards(boards: Board[]): void {
    this.socket.emit('sortBoards', boards);
  }

  /**
   * Delete a board
   */
  deleteBoard(boardId: string): void {
    this.socket.emit('deleteBoard', boardId);
  }

  /**
   * Update tasks on a specific board
   */
  updateTasks(boardId: string, tasks: Task[]): void {
    this.socket.emit('updateTasks', { boardId, tasks });
  }

  /**
   * Remove a specific task from a board
   */
  removeTask(boardId: string, task: Task): void {
    this.socket.emit('removeTask', { boardId, task });
  }
}
