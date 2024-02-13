import {Component, Inject} from '@angular/core';
  import {
  TUI_COUNTRIES,
  TuiCheckboxModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFilterByInputPipeModule,
  TuiInputModule, TuiInputPhoneInternationalModule
  } from "@taiga-ui/kit";
  import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
  import {
  TuiAlertService,
  TuiButtonModule,
    TuiDataListModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
  import {Router, RouterLink} from "@angular/router";
import {TranslocoPipe, TranslocoService} from "@ngneat/transloco";
import {FormInputComponent} from "../../shared/components/form-input/form-input.component";
import { User} from "../../shared/models/user.interface";
import {UserService} from "../../core/services/user.service";
import {TuiCountryIsoCode} from "@taiga-ui/i18n";
import {Observable} from "rxjs";
import {AsyncPipe, CommonModule} from "@angular/common";
import { TuiLetModule, TuiMapperPipeModule } from '@taiga-ui/cdk';
import {confirmPasswordValidator} from "../../shared/validators/confirm-password.validator";
import { mapCountryNames } from "../../shared/utils/taiga-country-name-mapper";

  @Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [
      CommonModule,
      TuiInputModule,
      ReactiveFormsModule,
      TuiButtonModule,
      TuiTextfieldControllerModule,
      TuiCheckboxModule,
      TuiNotificationModule,
      TuiComboBoxModule,
      RouterLink,
      TranslocoPipe,
      FormInputComponent,
      TuiDataListWrapperModule,
      TuiMapperPipeModule,
      TuiFilterByInputPipeModule,
      AsyncPipe,
      TuiInputPhoneInternationalModule,
      FormsModule,
      TuiDataListModule,
      TuiLetModule,
    ],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {

    signUpFormGroup = new FormGroup({
      emailFormControl: new FormControl('', Validators.email),
      loginFormControl: new FormControl('', Validators.required),
      passwordFormControl: new FormControl('', Validators.required),
      confirmPasswordFormControl: new FormControl('', Validators.required),
      firstNameFormControl: new FormControl('', Validators.required),
      lastNameFormControl: new FormControl('', Validators.required),
      civilityFormControl: new FormControl('', Validators.required),
      phoneNumberFormControl: new FormControl('', Validators.required),
      addressFormControl: new FormControl('', Validators.required),
      cityFormControl: new FormControl('', Validators.required),
      postalCodeFormControl: new FormControl('', Validators.required),
      countryFormControl: new FormControl('', Validators.required),
    }, {
      validators: confirmPasswordValidator('passwordFormControl', 'confirmPasswordFormControl')
    });

    countries: TuiCountryIsoCode[] = Object.values(TuiCountryIsoCode)
    countryNameMapper = mapCountryNames;
    countryIsoCode = TuiCountryIsoCode.FR;

    constructor(private router: Router,
                private userService: UserService,
                private translocoService: TranslocoService,
                @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
                @Inject(TUI_COUNTRIES) readonly countriesNames$: Observable<Record<TuiCountryIsoCode, string>>,
    ) {}

    /**
     * Submits the form and updates the user data
     */
    onSubmit() {
      if (this.signUpFormGroup.invalid) {
        let errorMessage = this.translocoService.translate('sign-up.error-form-message');
        if (this.signUpFormGroup.errors && this.signUpFormGroup.errors['passwordMismatch']) {
          errorMessage = this.translocoService.translate('sign-up.error-password-message');
        }
        this.alerts.open(errorMessage, { status: 'error' }).subscribe();
      }
      else {
        let userData: User = this.mapSignupFormGroupToUser(this.signUpFormGroup);
        this.userService.updateUserData(userData);

        this.router.navigate(['/account'])
          .then(() =>
            this.alerts.open( this.translocoService.translate("sign-up.success-sign-up"), { label: this.translocoService.translate("sign-up.success-welcome") + ' ' + userData.firstName + '!', status: 'success'}
            ).subscribe()
          );
      }
    }


    /**
     * Maps the form group to a user object
     * @param signUpFormGroup - The form group to map
     */
    mapSignupFormGroupToUser(signUpFormGroup: FormGroup): User {
      return {
        email: signUpFormGroup.value.emailFormControl!,
        login: signUpFormGroup.value.loginFormControl!,
        password: signUpFormGroup.value.passwordFormControl!,
        firstName: signUpFormGroup.value.firstNameFormControl!,
        lastName: signUpFormGroup.value.lastNameFormControl!,
        civility: signUpFormGroup.value.civilityFormControl!,
        phoneNumber: signUpFormGroup.value.phoneNumberFormControl!,
        address: signUpFormGroup.value.addressFormControl!,
        city: signUpFormGroup.value.cityFormControl!,
        postalCode: signUpFormGroup.value.postalCodeFormControl!,
        country: signUpFormGroup.value.countryFormControl!,
      }
    }
}
