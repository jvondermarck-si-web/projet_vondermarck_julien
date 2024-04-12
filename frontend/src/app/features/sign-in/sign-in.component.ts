import { Component, OnDestroy } from '@angular/core';
import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";
import {TranslocoPipe} from "@ngneat/transloco";
import { NgOptimizedImage } from '@angular/common'
import { AuthService } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

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
export class SignInComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  signInFormGroup = new FormGroup({
    emailFormControl: new FormControl('', Validators.required),
    passwordFormControl: new FormControl('', Validators.required),
    rememberMeFormControl: new FormControl(false),
  });

  constructor(private authService: AuthService) { }

  signIn() {
    const { emailFormControl, passwordFormControl } = this.signInFormGroup.controls;

    if (this.signInFormGroup.invalid) return;

    this.authService
      .login(emailFormControl.value!, passwordFormControl.value!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}