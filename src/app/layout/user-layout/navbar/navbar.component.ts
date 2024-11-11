import { Component, EventEmitter, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; // For mat-list-item styling
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() menuItemClicked = new EventEmitter<void>();
  constructor(private authService: AuthService, private router: Router
  ) { }

  onMenuItemClick() {
    this.menuItemClicked.emit();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['']); // Redirect to login page after logout
  }

}
