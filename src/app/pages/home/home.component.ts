import { Component } from '@angular/core';
import { MaterialModule } from "../../material.module";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  items: string[] = [
    'Angular 19.2.15',
    'Angular Material 19.2.19',
    'Node.js version 22 for the back-end',
    'Typescript 5.7.3',
    'MongoDB'
  ];
}
