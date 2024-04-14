import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface FormData {
  photo: string;
  age: number;
  interest: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  address: string;
  state: string;
  country: string;
  addressType: string;
  address1: string;
  address2: string;
  companyAddress1: string;
  companyAddress2: string;
  tags: string[];
}
@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  setFormData(value: any) {
    throw new Error('Method not implemented.');
  }
  //private dataUrl = 'data.json'; // Assuming data.json is in the assets folder

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<any> {
    return this.http.get<any>('assets/data.json');
  }
}