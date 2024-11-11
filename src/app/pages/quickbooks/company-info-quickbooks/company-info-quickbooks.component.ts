import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QuickbooksService } from '../../../services/quickbooks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-info-quickbooks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-info-quickbooks.component.html',
  styleUrls: ['./company-info-quickbooks.component.css'] // Updated to styleUrls
})
export class CompanyInfoQuickbooksComponent implements OnInit {
  companyInfo: any;

  constructor(
    private quickbooksService: QuickbooksService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchCompanyInfo();
  }

  fetchCompanyInfo(): void {
    const accessToken = localStorage.getItem('quickbooksAccessToken');
    const realmId = localStorage.getItem('quickbooksRealmId');

    if (accessToken && realmId) {
      this.quickbooksService.getCompanyInfo(accessToken, realmId).subscribe(
        (response) => {
          // Adjusting to access the correct nested structure
          if (response && response.companyInfo && response.companyInfo.CompanyInfo) {
            this.companyInfo = response.companyInfo.CompanyInfo; // Directly assigning nested CompanyInfo
            console.log('Company Info:', this.companyInfo);  // Debug to confirm assignment
            this.cdr.detectChanges();  // Trigger change detection manually
          }
        },
        (error) => {
          console.error('Error fetching company information:', error);
        }
      );
    } else {
      console.error('Missing accessToken or realmId');
    }
  }




}
