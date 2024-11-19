import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CarService } from '../../../services/car.service';
import { Car, CarStatus } from '../../../services/models/car.model';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  displayedCars: Car[] = [];
  searchQuery = '';
  currentPage = 1;
  totalCars = 0;
  carsPerPage = 10;
  pages: number[] = [];
  limit = 10;
  totalPages = 1;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars(this.currentPage);
  }

  carStatuses = Object.values(CarStatus);
  editingStatus: { [carId: string]: boolean } = {};

  toggleEditingStatus(carId: string) {
    this.editingStatus[carId] = !this.editingStatus[carId];
  }

  updateCarStatus(carId: string, newStatus: CarStatus) {
    this.carService.updateCarStatus(carId, newStatus).subscribe({
      next: () => {
        this.editingStatus[carId] = false;
      },
      error: (err) => {
        console.error('Failed to update car status:', err);
      }
    });
  }

  loadCars(page: number) {
    this.carService.findAllCarsL(page, this.limit).subscribe({
      next: (data) => {
        this.cars = data.data;
        this.totalCars = data.totalClients; // Corrected this line to use totalClients
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        this.updateDisplayedCars();
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
  }

  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      this.filteredCars = this.cars.filter(car =>
        car.make?.name.toLowerCase().includes(query) ||
        car.model?.name.toLowerCase().includes(query) ||
        car.licenseNumber?.includes(query) ||
        car.vin?.includes(query)
      );
    } else {
      this.filteredCars = [...this.cars];
    }
    this.updatePagination();
    this.updateDisplayedCars();
  }

  updatePagination() {
    const pageCount = Math.ceil(this.filteredCars.length / this.carsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  updateDisplayedCars() {
    const start = (this.currentPage - 1) * this.carsPerPage;
    const end = start + this.carsPerPage;
    this.displayedCars = this.filteredCars.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedCars();
    }
  }

  editCar(carId: string) {
    // Code to open an edit modal or navigate to an edit page
  }

  viewCar(carId: string) {
    // Code to view car details in a modal or navigate to a details page
  }

  deleteCar(carId: string) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(carId).subscribe({
        next: () => {
          this.loadCars(this.currentPage); // Reload cars after deletion
        },
        error: (err) => {
          console.error('Error deleting car:', err);
        },
      });
    }
  }
}
