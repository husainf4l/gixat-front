import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Board, Task } from './board.model';
import { io as socketIo } from 'socket.io-client';

import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})

export class BoardLiveService implements OnDestroy {
  private socket!: ReturnType<typeof socketIo>;
  private subscriptions: Subscription[] = [];


  constructor() {
    try {
      // Establish a connection to the WebSocket server
      this.socket = socketIo(environment.webApi, {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
      });

      this.setupSocketEventHandlers();
    } catch (error) {
      console.error('Socket initialization error:', error);
    }
  }


  private setupSocketEventHandlers(): void {
    this.socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error);
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('Socket disconnected:', reason);
    });
  }




  /**
   * Emit request to create a new board for the current user
   */
  createBoard(data: { companyId: string; title: string }): Observable<any> {
    console.log('---------1-------', data)

    return new Observable<Board>((observer) => {
      console.log('---------2-------')

      this.socket.emit('createBoard', data);
      console.log('---------2-------')

      const listener = (board: Board) => {
        observer.next(board);
        observer.complete();
      };
      console.log('----------------')
      const errorListener = (error: any) => {
        observer.error(error);
      };

      this.socket.once('boardCreated', listener);
      this.socket.once('createBoardError', errorListener);

      // Cleanup
      return () => {
        this.socket.off('boardCreated', listener);
        this.socket.off('createBoardError', errorListener);
      };
    });
  }

  /**
   * Get all boards owned by the current user
   */
  getBoards(companyId: string): Observable<Board[]> {
    return new Observable<Board[]>((observer) => {
      this.socket.emit('getBoards', { companyId });

      const successListener = (data: Board[]) => {
        observer.next(data);
      };

      const errorListener = (error: any) => {
        observer.error(error);
      };

      this.socket.on('boardsUpdated', successListener);
      this.socket.on('getBoardsError', errorListener);

      // Cleanup
      return () => {
        this.socket.off('boardsUpdated', successListener);
        this.socket.off('getBoardsError', errorListener);
      };
    });
  }

  /**
   * Sort boards by updating their priority
   */
  sortBoards(boards: Board[]): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.socket.emit('sortBoards', boards);

      const successListener = () => {
        observer.next(true);
        observer.complete();
      };

      const errorListener = (error: any) => {
        observer.error(error);
      };

      this.socket.once('boardsSorted', successListener);
      this.socket.once('sortBoardsError', errorListener);

      // Cleanup
      return () => {
        this.socket.off('boardsSorted', successListener);
        this.socket.off('sortBoardsError', errorListener);
      };
    });
  }

  /**
   * Delete a board
   */
  deleteBoard(boardId: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.socket.emit('deleteBoard', boardId);

      const successListener = () => {
        observer.next(true);
        observer.complete();
      };

      const errorListener = (error: any) => {
        observer.error(error);
      };

      this.socket.once('boardDeleted', successListener);
      this.socket.once('deleteBoardError', errorListener);

      // Cleanup
      return () => {
        this.socket.off('boardDeleted', successListener);
        this.socket.off('deleteBoardError', errorListener);
      };
    });
  }

  /**
   * Update tasks on a specific board
   */
  updateTasks(boardId: string, tasks: Task[]): Observable<boolean> {
    console.log('---------1-------', boardId)

    return new Observable<boolean>((observer) => {
      this.socket.emit('updateTasks', { boardId, tasks });

      const successListener = () => {
        observer.next(true);
        observer.complete();
      };

      const errorListener = (error: any) => {
        observer.error(error);
      };

      this.socket.once('tasksUpdated', successListener);
      this.socket.once('updateTasksError', errorListener);

      // Cleanup
      return () => {
        this.socket.off('tasksUpdated', successListener);
        this.socket.off('updateTasksError', errorListener);
      };
    });
  }

  /**
   * Remove a specific task from a board
   */
  removeTask(boardId: string, task: Task): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.socket.emit('removeTask', { boardId, task });

      const successListener = () => {
        observer.next(true);
        observer.complete();
      };

      const errorListener = (error: any) => {
        observer.error(error);
      };

      this.socket.once('taskRemoved', successListener);
      this.socket.once('removeTaskError', errorListener);

      // Cleanup
      return () => {
        this.socket.off('taskRemoved', successListener);
        this.socket.off('removeTaskError', errorListener);
      };
    });
  }

  /**
   * Check if socket is connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Manually reconnect socket
   */
  reconnect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  /**
   * Unsubscribe from all socket listeners on destroy
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
    }
  }
}
