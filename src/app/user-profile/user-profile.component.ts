import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  formData: any;
  profileForm!: FormGroup; // Add profileForm FormGroup variable

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const formDataString = localStorage.getItem('formData');
    if (formDataString) {
      this.formData = JSON.parse(formDataString);
      this.initializeForm(); // Call initializeForm to create the form initially
    } else {
      console.error('Form data not found in local storage.');
    }
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      firstName: [this.formData.firstName, Validators.required],
      lastName: [this.formData.lastName, Validators.required],
      age: [this.formData.age, Validators.required],
      email: [this.formData.email, [Validators.required, Validators.email]],
      state: [this.formData.state, Validators.required],
      // Add other form controls based on your data structure
    });
  }

  editProfile() {
    // Enable editing mode by setting form controls as enabled
    this.profileForm.enable();
  }

  submitChanges() {
    if (this.profileForm.valid) {
      // Save changes to formData object
      const updatedData = this.profileForm.value;
      this.formData = { ...this.formData, ...updatedData };

      // Save updated formData to local storage
      localStorage.setItem('formData', JSON.stringify(this.formData));

      // Disable editing mode after saving changes
      this.profileForm.disable();
    } else {
      // Handle form validation errors
    }
  }
}
