// app.component.ts
import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userProfileData: any = {};
 
  constructor(private dialog: MatDialog) { }

  openRegistrationForm(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = '600px';
    dialogConfig.position = { top: '-50%', left: '46%' };

      
      const dialogRef = this.dialog.open(RegistrationFormComponent, dialogConfig);

      dialogRef.componentInstance.closeDialogEvent.subscribe(() => {
        dialogRef.close(); // Close the dialog when the close event is emitted
      });
    }
    onFormSubmitted(formData: any): void {
      this.userProfileData = formData; // Assign form data to userProfileData
    }
  }

