import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuickbooksService } from '../../services/quickbooks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quickbooks',
  templateUrl: './quickbooks.component.html',
  styleUrls: ['./quickbooks.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class QuickbooksComponent implements OnInit {
  code: string = '';
  realmId: string = '';
  companyInfo: any = null;
  errorMessage: string = '';
  loading: boolean = false;
  token: string | null = "";

  constructor(
    private quickbooksService: QuickbooksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Step 1: Redirect user to QuickBooks for authentication if no code exists
    if (!this.route.snapshot.queryParamMap.has('code')) {
      this.redirectToQuickBooks();
    }
    this.token = localStorage.getItem('quickbooksAccessToken')

    // Step 2: Get OAuth code and companyId from the query params
    this.route.queryParams.subscribe(params => {
      this.code = params['code'] || '';
      this.realmId = params['realmId'] || '';

      if (this.code && this.realmId) {
        this.handleOAuthCallback();
      }
    });
    console.log(this.realmId, "        sdasad          ", this.code)
  }

  // Redirect to QuickBooks OAuth page for user authentication
  redirectToQuickBooks(): void {
    this.quickbooksService.getOAuthUrl().subscribe(response => {
      window.location.href = response.url;  // Redirect the user to the OAuth URL
    });
  }

  // Handle the OAuth callback and exchange code for OAuth token
  handleOAuthCallback(): void {
    this.loading = true;
    const companyId = localStorage.getItem('companyId') || "";
    this.quickbooksService.handleOAuthCallback(this.code, this.realmId, companyId).subscribe(
      response => {
        const tokenData = response.tokenData;
        localStorage.setItem('quickbooksAccessToken', tokenData.access_token);
        localStorage.setItem('quickbooksRealmId', this.realmId);

        this.getCompanyInfo(tokenData.access_token);
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Error fetching OAuth token: ' + error.message;
      }
    );
  }

  // Fetch company information using the access token
  getCompanyInfo(accessToken: string): void {
    console.log('Startedaaaaaaaaaaaa');
    this.loading = true;
    this.quickbooksService.getCompanyInfo(accessToken, this.realmId).subscribe(
      response => {
        this.companyInfo = response.companyInfo;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Error fetching company info: ' + error.message;
      }
    );
  }
}
