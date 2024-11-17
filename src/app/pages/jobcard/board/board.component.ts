import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../services/board.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() board!: Board;

  constructor(private boardServices: BoardService, private dialog: MatDialog) { }




}
