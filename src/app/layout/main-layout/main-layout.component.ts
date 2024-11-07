import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainNavComponent } from "./main-nav/main-nav.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, MainNavComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
