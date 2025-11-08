import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MaterialModule } from "../app/material.module";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private router: Router) { }

  title = 'GitHub Intergration Dashboard - Demo';
}
