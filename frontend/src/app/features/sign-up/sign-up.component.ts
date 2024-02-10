import {Component, Inject} from '@angular/core';
  import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
  import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
  import {TuiAlertService, TuiButtonModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
  import {Router, RouterLink} from "@angular/router";
import {TranslocoPipe} from "@ngneat/transloco";
import {FormInputComponent} from "../../shared/components/form-input/form-input.component";
import { User} from "../../shared/models/user.interface";
import {UserService} from "../../core/services/user.service";

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

    constructor(private router: Router, private userService: UserService, @Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

    onSubmit($event: any) {

      console.log(this.signUpFormGroup.value);
      let userData: User = {
        email: this.signUpFormGroup.value.emailFormControl!,
        login: this.signUpFormGroup.value.loginFormControl!,
        password: this.signUpFormGroup.value.passwordFormControl!,
        firstName: this.signUpFormGroup.value.firstNameFormControl!,
        lastName: this.signUpFormGroup.value.lastNameFormControl!,
        civility: this.signUpFormGroup.value.civilityFormControl!,
        phoneNumber: this.signUpFormGroup.value.phoneNumberFormControl!,
        address: this.signUpFormGroup.value.addressFormControl!,
        city: this.signUpFormGroup.value.cityFormControl!,
        postalCode: this.signUpFormGroup.value.postalCodeFormControl!,
        country: this.signUpFormGroup.value.countryFormControl!,
      }
      console.log(userData);
      this.userService.updateUserData(userData);

      this.router.navigate(['/account']).then(
        () => this.alerts.open('Successfully signed up.', { label: 'Welcome ' + userData.firstName + '!', status: 'success' }).subscribe()
      );

    }
}
