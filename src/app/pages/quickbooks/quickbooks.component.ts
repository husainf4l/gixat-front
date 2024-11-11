import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuickbooksService } from '../../services/quickbooks.service';

@Component({
  selector: 'app-quickbooks',
  templateUrl: './quickbooks.component.html',
  styleUrls: ['./quickbooks.component.css'],
})
export class QuickbooksComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quickbooksService: QuickbooksService // Inject QuickBooks service
  ) { }

  ngOnInit(): void {
    // Check if the redirect URL contains the authorization code
    this.route.queryParams.subscribe(params => {
      const code = params['code'];  // The authorization code received from QuickBooks
      const state = params['state'];  // The state parameter (for CSRF protection)
      const realmId = params['realmId']; // The company (realm) ID from QuickBooks

      if (code) {
        // Send the code to your backend to exchange for an access token
        this.quickbooksService.getOAuthToken(code).subscribe(
          tokenData => {
            console.log('code:', code);
            console.log('state:', state);
            console.log('realmId:', realmId);




            console.log('OAuth token received:', tokenData);
            // Store the token data securely (access token, refresh token)
            // You can navigate the user to another page (e.g., dashboard) or handle the response
          },
          error => {
            console.error('Error getting OAuth token:', error);
          }
        );
      } else {
        console.error('Authorization code not found!');
      }
    });
  }

  // Redirect to QuickBooks for OAuth authorization
  redirectToQuickBooks(): void {
    const clientId = 'AB7qTuCKfg2zoaWbC3CVMnWqKzVZE5WSjfC7j9VZeLhu31wVfo'; // Your actual client ID from QuickBooks Sandbox
    const redirectUri = 'http://tawjihiai.com:4200/app/quickbooks'; // Your redirect URI, ensure it's added to QuickBooks app settings
    const scope = 'com.intuit.quickbooks.accounting'; // Scope for QuickBooks API access
    const state = 'PlaygroundAuth'; // Optional state parameter for CSRF protection
    const realmId = '9341453443035550'; // Your QuickBooks Sandbox company ID
    const locale = 'en-us'; // Locale for the user interface (optional)

    // Correct URL structure with URL encoding
    const authUrl = `https://appcenter.intuit.com/connect/oauth2/authorize?` +
      `client_id=${clientId}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `state=${encodeURIComponent(state)}&` +
      `realm_id=${realmId}&` +
      `locale=${locale}`;

    // Redirect the user to QuickBooks OAuth2 authorization page
    window.location.href = authUrl;
  }
}
