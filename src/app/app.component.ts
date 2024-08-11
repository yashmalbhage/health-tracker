import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'health-challenge-tracker';
  isDarkMode: boolean = false;
  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }
}
