import { Component } from '@angular/core';
  import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
  import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
  import {TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
  import {RouterLink} from "@angular/router";
import {TranslocoPipe} from "@ngneat/transloco";
import {FormInputComponent} from "../../shared/components/form-input/form-input.component";

  @Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [TuiInputModule,
      ReactiveFormsModule,
      TuiButtonModule,
      TuiTextfieldControllerModule,
      TuiCheckboxModule,
      TuiNotificationModule,
      RouterLink, TranslocoPipe, FormInputComponent,
    ],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

    signUpFormGroup = new FormGroup({
      emailFormControl: new FormControl(''),
      loginFormControl: new FormControl(''),
      passwordFormControl: new FormControl(''),
      confirmPasswordFormControl: new FormControl(''),
      firstNameFormControl: new FormControl(''),
      lastNameFormControl: new FormControl(''),
      civilityFormControl: new FormControl(''),
      phoneNumberFormControl: new FormControl(''),
      addressFormControl: new FormControl(''),
      cityFormControl: new FormControl(''),
      postalCodeFormControl: new FormControl(''),
      countryFormControl: new FormControl(''),
    });

    onSubmit(): void {
      console.log(this.signUpFormGroup.value);
    }
}
