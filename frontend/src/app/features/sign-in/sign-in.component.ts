import { Component } from '@angular/core';
import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";
import {TranslocoPipe} from "@ngneat/transloco";
import { NgOptimizedImage } from '@angular/common'

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
        TranslocoPipe,
        NgOptimizedImage
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
