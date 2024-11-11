import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QuickbooksService } from '../../../services/quickbooks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  invoices: any[] = [];

  constructor(
    private quickbooksService: QuickbooksService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchInvoices();
  }

  fetchInvoices(): void {
    const accessToken = localStorage.getItem('quickbooksAccessToken');
    const companyId = localStorage.getItem('quickbooksRealmId');

    if (accessToken && companyId) {
      this.quickbooksService.getInvoices(accessToken, companyId).subscribe(
        (response) => {
          if (response && response.invoices) {
            this.invoices = response.invoices;
            console.log('Invoices:', this.invoices); // Debugging output
            this.cdr.detectChanges(); // Trigger change detection
          }
        },
        (error) => {
          console.error('Error fetching invoices:', error);
        }
      );
    } else {
      console.error('Missing accessToken or companyId');
    }
  }
}
