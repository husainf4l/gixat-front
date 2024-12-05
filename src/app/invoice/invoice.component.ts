import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
CommonModule

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  invoiceDate = new Date().toLocaleDateString();
  customerName = 'John Doe';
  customerAddress = '456 Elm Street, Springfield, IL';
  customerEmail = 'john.doe@example.com';

  invoiceItems = [
    { name: 'Web Design Services', quantity: 1, unitPrice: 500.00, total: 500.00 },
    { name: 'Hosting (1 Year)', quantity: 1, unitPrice: 120.00, total: 120.00 },
    { name: 'Domain Registration', quantity: 1, unitPrice: 20.00, total: 20.00 }
  ];

  subtotal = this.invoiceItems.reduce((sum, item) => sum + item.total, 0);
  tax = this.subtotal * 0.1; // 10% tax
  total = this.subtotal + this.tax;
}
