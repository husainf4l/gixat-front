import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
  constructor(private authService: AuthService, private router: Router) { }

  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const sidebar = document.getElementById('default-sidebar');
    const button = document.querySelector('button[aria-controls="default-sidebar"]');

    if (this.sidebarOpen && sidebar && button && !sidebar.contains(clickedElement) && !button.contains(clickedElement)) {
      this.sidebarOpen = false;
    }
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['']); // Redirect to login page after logout
  }
}
