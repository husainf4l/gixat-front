import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quickbooks',
  templateUrl: './quickbooks.component.html',
  styleUrls: ['./quickbooks.component.css'],
})
export class QuickbooksComponent {

  constructor(private router: Router) { }

  // Redirect to QuickBooks for OAuth authorization (Sandbox URL)
  // Redirect to QuickBooks for OAuth authorization (Sandbox URL)
  redirectToQuickBooks(): void {
    const clientId = 'AB7qTuCKfg2zoaWbC3CVMnWqKzVZE5WSjfC7j9VZeLhu31wVfo'; // Replace with your actual client ID from QuickBooks Sandbox
    const clientSecret = 'xMpZGQrUtOJ1DnaOOuQ3m9JXYY5utopLa0qZDrk3'
    const redirectUri = 'https://gixat.com/app';
    const scope = 'com.intuit.quickbooks.accounting'; // Scope for QuickBooks API access
    const state = 'PlaygroundAuth'; // Optional state parameter for CSRF protection
    const realmId = '9341453443035550'; // This is your QuickBooks Sandbox company ID
    const locale = 'en-us'; // Optional, the locale for the user interface

    // Generate the authorization URL dynamically using template literals
    const authUrl = `https://appcenter.intuit.com/app/connect/oauth2/authorize?
  client_id=${clientId}&
  scope=${scope}&
  redirect_uri=${encodeURIComponent(redirectUri)}&  // Ensure the redirect URI is URL-encoded
    response_type=code&

  state=${state}&
  realm_id=${realmId}&
  locale=${locale}`;

    // Redirect the user to QuickBooks OAuth2 authorization page
    window.location.href = authUrl;
  }
}
