import { Component, OnDestroy } from '@angular/core';
import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiAlertService, TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";
import {TranslocoPipe, TranslocoService} from "@ngneat/transloco";
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
    emailFormControl: new FormControl('livalie@italy.it', Validators.required),
    passwordFormControl: new FormControl('livalie', Validators.required),
    rememberMeFormControl: new FormControl(false),
  });

  constructor(private authService: AuthService, private readonly alerts: TuiAlertService, private translocoService: TranslocoService) { }

  signIn() {
    const { emailFormControl, passwordFormControl } = this.signInFormGroup.controls;

    if (this.signInFormGroup.invalid) return;

    this.authService
      .login(emailFormControl.value!, passwordFormControl.value!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: user => {
          console.log(user);
          const message = this.translocoService.translate('sign-in.success-login', { user: user.firstName });
          console.log(message);

          this.alerts.open('', { label: message, status: 'success' }).subscribe();
        },
        error: () => {
          console.log('error');
          this.alerts.open('',{ label: this.translocoService.translate('sign-in.error-login'), status: 'error' }).subscribe();
        }
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}