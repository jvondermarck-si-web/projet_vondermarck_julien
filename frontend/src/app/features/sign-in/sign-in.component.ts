import { Component } from '@angular/core';
import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    TuiInputModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiCheckboxModule,
    TuiNotificationModule,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {

  signInFormGroup = new FormGroup({
    emailFormControl: new FormControl(''),
    passwordFormControl: new FormControl(''),
    rememberMeFormControl: new FormControl(false),
  });


}
