import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../sevices/rest.service';
import { StateService } from '../sevices/state.service';
import { HttpClient } from '@angular/common/http';


function mobileNumberValidator(control: FormControl): ValidationErrors | null {
  const pattern = /^[0-9]{10}$/; // Pattern for a 10-digit mobile number

  if (control.value && !pattern.test(control.value)) {
    return { invalidMobile: true };
  }

  return null;
}
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  apiUrl = 'http://68.178.166.216/api/API/BillToPartyMaster/SaveData';
  form!: FormGroup;
  personDetailform!: FormGroup;
  contactPersonDetails: any[] = [];

  constructor(private _rest: RestService,
    public _state: StateService,
    private http: HttpClient,
    private _router: Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      RowId: [''],
      ActionId: [''],
      Code: ['', Validators.required],
      Name: ['', Validators.required],
      Address: [''],
      Country: [''],
      State: [''],
      City: [''],
      Mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      Email: [''],
      GSTNo: [''],
      PANNo: [''],
      PinCode: [''],
      Latitude: [''],
      Longitude: [''],
    });

    this.personDetailform = this.fb.group({
      PersonName: ['', Validators.required],
      PersonMobile: ['', [Validators.pattern("^[0-9]{10}$")]],
      PersonEmail: ['', [Validators.required, Validators.email]],
      Department: ['', Validators.required],
      Designation: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  addContactPerson() {
    const contactDetails = this.personDetailform.value;
    if (contactDetails) {
      const contact = contactDetails;
      this.contactPersonDetails.push(contact);
      this.personDetailform.reset();
    }
  }

  onSubmit() {
    if (this.form.valid && this.contactPersonDetails.length >= 2) {
      console.log(this.form.value);
      const finalData = { ...this.form.value, ContactPersonDetails: [...this.contactPersonDetails] };
      console.log(finalData);
      this.http.post(this.apiUrl, { finalData }).subscribe(
        (response: any) => {
          console.log(response)
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
    }
    else {
      console.log("all filed a mandatory or add at list 2 person")
    }
  }
}


