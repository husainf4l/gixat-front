import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Key Metrics for the Dashboard
  stats = {
    totalVehicles: 150,
    activeVehicles: 40,
    awaitingParts: 12,
    completedToday: 5,
    totalClients: 98,
    estimatedRevenueToday: 3200, // in dollars
  };

  recentActivities = [
    { id: 'JX101', vehicle: 'Land Cruiser', service: 'Oil Change', status: 'Completed', date: '2024-11-08' },
    { id: 'JX102', vehicle: 'Hilux', service: 'Brake Replacement', status: 'In Service', date: '2024-11-08' },
    { id: 'JX103', vehicle: 'Ford F-150', service: 'Transmission Check', status: 'Awaiting Parts', date: '2024-11-07' },
  ];

  partsAwaiting = [
    { partName: 'Brake Pads', vehicle: 'Nissan Patrol', eta: '2024-11-10' },
    { partName: 'Alternator', vehicle: 'Toyota Hilux', eta: '2024-11-11' },
    { partName: 'Timing Belt', vehicle: 'Mitsubishi Pajero', eta: '2024-11-12' },
  ];
}
