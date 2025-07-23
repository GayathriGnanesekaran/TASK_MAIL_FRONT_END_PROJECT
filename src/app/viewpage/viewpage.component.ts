import { Component } from '@angular/core';

@Component({
  selector: 'app-viewpage',
  standalone: false,
  templateUrl: './viewpage.component.html',
  styleUrl: './viewpage.component.css'
})
export class ViewpageComponent {
 username: string = 'Krish';
  email: string = 'pkrish@simplesolve.com';
}
