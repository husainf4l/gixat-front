import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { QuickbooksService } from '../../services/quickbooks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink]
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  recentActivities: any[] = [];
  partsAwaiting: any[] = [];
  companyInfo: any = null;
  errorMessage: string = ""

  constructor(private dashboardService: DashboardService, private quickbooksService: QuickbooksService,
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Fetch key metrics
    this.dashboardService.getKeyMetrics().subscribe((data) => {
      this.stats = data;
    });

    // Fetch recent activities
    this.dashboardService.getRecentActivities().subscribe((data) => {
      this.recentActivities = data;
    });

    // Fetch parts awaiting delivery
    this.dashboardService.getPartsAwaiting().subscribe((data) => {
      this.partsAwaiting = data;
    });
  }

}
