// user-profile-popup.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile-popup',
  templateUrl: './user-profile-popup.component.html',
  styleUrls: ['./user-profile-popup.component.css']
})
export class UserProfilePopupComponent implements OnInit{


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog) {}
  
  ngOnInit(): void {
    console.log('Received data:',this.data); // This will log the passed data in the console
  }
  
}
