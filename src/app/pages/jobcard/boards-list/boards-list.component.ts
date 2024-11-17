import { Component, OnDestroy, OnInit } from '@angular/core';
import { Board } from '../services/board.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardComponent } from "../board/board.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-boards-list',
  standalone: true,
  imports: [BoardComponent, MatIconModule, DragDropModule, CommonModule],
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css'],
})
export class BoardsListComponent implements OnInit {
  boards: Board[] = [];
  companyId: string = "";

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.companyId = localStorage.getItem('companyId')!;
    this.loadBoards(this.companyId);
  }

  loadBoards(companyId: string) {
    this.boardService.getBoards(companyId).subscribe({
      next: (data) => {
        this.boards = data;
        console.log('Filtered Boards:', this.boards);
      },
      error: (err) => {
        console.error('Error fetching boards:', err);
      },
    });
  }






}
