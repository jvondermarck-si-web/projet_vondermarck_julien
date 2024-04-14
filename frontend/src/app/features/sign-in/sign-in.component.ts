import { Component, OnDestroy } from '@angular/core';
import {TuiCheckboxModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {Router, RouterLink} from "@angular/router";
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
        NgOptimizedImage,
        TuiInputPasswordModule,
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

  constructor(private authService: AuthService, private router: Router) { }

  signIn() {
    const { emailFormControl, passwordFormControl } = this.signInFormGroup.controls;

    if (this.signInFormGroup.invalid) return;

    this.authService
      .login(emailFormControl.value!, passwordFormControl.value!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        {
          next: () => {
            console.log('User logged in');
            this.router.navigate(['/account']);
          },
        }
      )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}