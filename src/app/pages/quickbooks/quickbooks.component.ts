import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quickbooks',
  templateUrl: './quickbooks.component.html',
  styleUrls: ['./quickbooks.component.css'],
})
export class QuickbooksComponent {

  constructor(private router: Router) { }

  // Redirect to QuickBooks for OAuth authorization
  redirectToQuickBooks(): void {
    const clientId = 'AB7qTuCKfg2zoaWbC3CVMnWqKzVZE5WSjfC7j9VZeLhu31wVfo'; // Your actual client ID from QuickBooks Sandbox
    const redirectUri = 'https://gixat.com/app/quickbooks'; // Your redirect URI, ensure it's added to QuickBooks app settings
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
