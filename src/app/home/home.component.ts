import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private dialog: MatDialog) { }

  openRegistrationForm(): void {
    this.dialog.open(RegistrationFormComponent, {
      width: '400px',
      data: {} 
    });
  }
}
