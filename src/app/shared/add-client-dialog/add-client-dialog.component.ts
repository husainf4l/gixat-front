import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AddClientDialogComponent {
  newClientName: string = '';
  newClientPhone: string = '';
  loading: boolean = false;


  constructor(
    private dialogRef: MatDialogRef<AddClientDialogComponent>,
    private clientService: ClientService
  ) { }

  saveClient() {
    if (this.newClientName && this.newClientPhone) {
      this.loading = true; // Show loading indicator
      this.clientService.createClient({
        clientName: this.newClientName,
        phoneNumber: this.newClientPhone,
      }).subscribe({
        next: (newClient) => {
          this.dialogRef.close(newClient);
        },
        error: (err) => {
          console.error('Error saving client:', err);
          alert('Failed to save the client. Please try again.');
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
  }



  closeDialog() {
    this.dialogRef.close(null);
  }
}
