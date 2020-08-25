import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'survey-module';
  constructor(private router: Router) {}

  goToTable(event) {
    // console.log(event);
    // console.log(class1);
    // const hasClass = event.target.classList;
    // console.log(hasClass);
    this.router.navigateByUrl('/');
    // console.log('this is me');
  }
}
