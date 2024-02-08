import { Component } from '@angular/core';
  import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
  import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
  import {TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
  import {RouterLink} from "@angular/router";

  @Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [    TuiInputModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiCheckboxModule,
    TuiNotificationModule,
    RouterLink,
  ],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

    signUpFormGroup = new FormGroup({
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
