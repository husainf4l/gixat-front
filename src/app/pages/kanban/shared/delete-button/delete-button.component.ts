import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent {
  canDelete: boolean | undefined;

  @Output() delete = new EventEmitter<boolean>();

  cancel() {
    this.canDelete = false;
  }

  prepareForDelete() {
    this.canDelete = true;
  }

  deleteBoard() {
    this.delete.emit(true);
    this.canDelete = false;
  }

}
