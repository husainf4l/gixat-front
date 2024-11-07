import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./layout/main-layout/footer/footer.component";
import { MainNavComponent } from "./layout/main-layout/main-nav/main-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, MainNavComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Gixat';
}
