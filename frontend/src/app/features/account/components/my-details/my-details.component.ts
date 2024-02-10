import { Component } from '@angular/core';
import {TranslocoPipe} from "@ngneat/transloco";
import {FormInputComponent} from "../../../../shared/components/form-input/form-input.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-my-details',
  standalone: true,
  imports: [
    TranslocoPipe,
    FormInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './my-details.component.html'
})
export class MyDetailsComponent {
  updateUserAccountFormGroup = new FormGroup({
    emailFormControl: new FormControl(''),
    passwordFormControl: new FormControl(''),
    firstNameFormControl: new FormControl(''),
    lastNameFormControl: new FormControl(''),
    civilityFormControl: new FormControl(''),
    phoneNumberFormControl: new FormControl(''),
    addressFormControl: new FormControl(''),
    cityFormControl: new FormControl(''),
    postalCodeFormControl: new FormControl(''),
    countryFormControl: new FormControl(''),
  });

}
