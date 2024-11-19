import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { CarService } from '../../services/car.service';
import { Make, Model, TransmissionType } from '../../services/models/car.model';
import { Client } from '../../services/models/client.model';

@Component({
  selector: 'app-add-car-dialog',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule, CommonModule],
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.css']
})
export class AddCarDialogComponent implements OnInit {
  car: any = {
    makeId: '',
    modelId: '',
    year: 2020,
    transmissionType: TransmissionType.AUTOMATIC,
    notes: '',
    clientAccountId: ''
  };

  client: Client;
  makeDisplayName: string = '';
  modelDisplayName: string = '';
  makes: Make[] = [];
  models: Model[] = [];
  filteredMakes: Make[] = [];
  filteredModels: Model[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private carService: CarService,
    private dialogRef: MatDialogRef<AddCarDialogComponent>
  ) {
    this.client = data.client;
    this.car.clientAccountId = this.client.id;
  }

  ngOnInit(): void {
    this.carService.getMakes().subscribe({
      next: (makes) => {
        this.makes = makes;
      },
      error: (err) => console.error('Error fetching makes:', err)
    });
  }

  onMakeSelected(make: Make) {
    this.car.makeId = make.id;
    this.makeDisplayName = make.name;
    this.filteredModels = make.models;
  }
  onModelSelected(model: Model) {
    this.car.modelId = model.id;
    this.modelDisplayName = model.name;
  }
  filterMakes(searchValue: string) {
    this.filteredMakes = this.makes.filter(make =>
      make.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  filterModels(searchValue: string) {
    this.filteredModels = this.filteredModels.filter(model =>
      model.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }





  saveCar(): void {
    if (this.car.makeId && this.car.modelId && this.car.year && this.car.clientAccountId) {
      this.carService.createCar(this.car).subscribe({
        next: (newCar) => {
          this.dialogRef.close(newCar);
        },
        error: (err) => {
          console.error('Error saving client:', err);
          alert('Failed to save the client. Please try again.');

        }
      })
    } else {
      alert('Please fill in all required fields.');
    }
  }



  cancel(): void {
    this.dialogRef.close(null); // Close dialog without saving
  }
}
