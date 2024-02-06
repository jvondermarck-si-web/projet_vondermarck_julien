import { Component } from '@angular/core';
import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiButtonModule, TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    TuiInputModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiCheckboxModule,
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
