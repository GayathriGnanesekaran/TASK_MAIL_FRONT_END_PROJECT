import { Component } from '@angular/core';

@Component({
    standalone:false,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  username: string = 'Krish';
  email: string = 'pkrish@simplesolve.com';
}
