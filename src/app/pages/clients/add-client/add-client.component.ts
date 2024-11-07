import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../../services/models/client.model';



@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {
  client: Client = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    notes: '',
    vehicle: {
      id: '',
      make: '',
      model: '',
    }
  };

  constructor(public dialogRef: MatDialogRef<AddClientComponent>) { }

  addClient() {
    this.dialogRef.close();
  }
  closeModal() {
    this.dialogRef.close();

  }

}
