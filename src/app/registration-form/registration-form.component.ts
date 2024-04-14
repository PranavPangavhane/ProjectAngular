import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { CandidatesService } from '../service/candidates.service';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  [x: string]: any;
  photoUrl: string | undefined;
  registrationForm: FormGroup;
  tags: string[] = [];
  selectedTags: string[] = [];
  interestControl: FormControl<string | null> = new FormControl<string | null>(null);
  @Output() closeDialogEvent: EventEmitter<void> = new EventEmitter<void>();
  
  imageWidth: number = 310;
  imageHeight: number = 325;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<RegistrationFormComponent>, private http: HttpClient , private router: Router,private dialog: MatDialog,private formDataService: CandidatesService) {
    this.registrationForm = this.fb.group({
      photo: [''],
      age: ['', [ Validators.min(18), Validators.max(100)]],
      interest: ['',],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [''],
      state: [''],
      country: [''],
      addressType: ['Home'],
      address1: ['', ],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: ['']
    });
  }

  ngOnInit(): void {
    const slider = document.getElementById('ageSlider') as HTMLInputElement;
    const output = document.getElementById('ageValue');

    if (output && slider) {
      output.innerHTML = slider.value;

      slider.oninput = function() {
        if (output) {
          output.innerHTML = (slider as HTMLInputElement).value;
        }
      };
    }
  }

  selectPhoto(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  }
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result; // Optional chaining to safely access e.target.result
          if (result) {
            const img = new Image();
            img.onload = () => {
              if (img.width === this.imageWidth && img.height === this.imageHeight) {
                this.photoUrl = result as string;
                this.registrationForm.patchValue({
                  photo: (result as string).split(',')[1]
                });
              } else {
                alert(`Please select an image with dimensions ${this.imageWidth}x${this.imageHeight} pixels.`);
              }
            };
            img.src = result as string;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  
  
  
  addTag(): void {
    const interest = this.interestControl.value!.trim(); // Use non-null assertion operator
    if (interest && !this.tags.includes(interest)) {
      this.tags.push(interest);
      this.interestControl.reset();
    }
  }
  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }


  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form validity:', this.registrationForm.valid);
      
      const formData = this.registrationForm.value;
      
      

   /*   this.candidatesService.getCandidates().subscribe((jsonData: any) => {
        // Merge form data with additional data from data.json
        
        console.log('Received JSON data:', jsonData);
        const combinedData = { ...formData, ...jsonData };
        
        // Open UserProfilePopupComponent with combined data
        const dialogRef = this.dialog.open(UserProfilePopupComponent, {
          data: combinedData
        });

        // Handle dialog closed event if needed
      }); */

      
    // Add tags to the formData object
    formData.tags = this.tags;

    // Store the formData object in local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Navigate to user profile component
    this.router.navigate(['/profile']);
      
    const queryParams = Object.keys(formData).map(key => key + '=' + formData[key]).join('&');
    formData.tags = this.tags;
      
      this.http.post('http://localhost:3000/candidates', this.registrationForm.value)
        .subscribe((response: any) => {
          console.log('Form submitted successfully:', response);
          this.closeDialog();
          this.registrationForm.reset();
          this.photoUrl = undefined;
          this.tags = [];
          
          alert('Form submitted successfully');

          this.router.navigate(['/profile'], { state: { formData: formData } });

        }, (error: any) => {
          console.error('Error submitting form:', error);
          this.formDataService.setFormData(this.registrationForm.value);
        });
       
    } else {
      console.error('Form is invalid. Please check all fields.');
      this.registrationForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.closeDialogEvent.emit();
  }
  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
  }
  
    navigateToNewPage() {
    this.router.navigate(['/new-page']);
  }

  onAddressTypeChange() {
    const addressTypeControl = this.registrationForm.get('addressType');
    addressTypeControl?.valueChanges.subscribe(value => {
      if (value === 'Home') {
        this.registrationForm.get('address1')?.setValidators(Validators.required);
        this.registrationForm.get('address2')?.setValidators(null);
        this.registrationForm.get('companyAddress1')?.setValidators(null);
        this.registrationForm.get('companyAddress2')?.setValidators(null);
      } else if (value === 'Company') {
        this.registrationForm.get('address1')?.setValidators(null);
        this.registrationForm.get('address2')?.setValidators(null);
        this.registrationForm.get('companyAddress1')?.setValidators(Validators.required);
        this.registrationForm.get('companyAddress2')?.setValidators(null);
      }
      this.registrationForm.updateValueAndValidity();
    });
  }
}
