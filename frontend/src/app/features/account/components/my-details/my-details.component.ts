import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslocoPipe} from "@ngneat/transloco";
import {FormInputComponent} from "../../../../shared/components/form-input/form-input.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TabComponent} from "../../models/tab-component.interface";
import {
  TUI_COUNTRIES, TuiCheckboxModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule, TuiFilterByInputPipeModule,
  TuiInputModule,
  TuiInputPhoneInternationalModule,
  TuiInputPhoneModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {TuiCountryIsoCode} from "@taiga-ui/i18n";
import {mapCountryNames} from "../../../../shared/utils/taiga-country-name-mapper";
import {TuiLetModule, TuiMapperPipeModule} from "@taiga-ui/cdk";
import {AsyncPipe, CommonModule} from "@angular/common";
import {Observable, Subscription} from "rxjs";
import {TuiDataListModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-my-details',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiCheckboxModule,
    TuiComboBoxModule,
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
    TuiSelectModule
  ],
  templateUrl: './my-details.component.html'
})
export class MyDetailsComponent implements OnInit, OnDestroy {
  updateUserAccountFormGroup: FormGroup;
  countries: TuiCountryIsoCode[] = Object.values(TuiCountryIsoCode);
  countryNameMapper = mapCountryNames;
  countryIsoCode = TuiCountryIsoCode.FR;
  userId = '';
  userSubscription: Subscription = new Subscription();
  civilities = ['Male', 'Female'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    @Inject(TUI_COUNTRIES) readonly countriesNames$: Observable<Record<TuiCountryIsoCode, string>>
  ) {
    this.updateUserAccountFormGroup = this.fb.group({
      emailFormControl: ['', Validators.required],
      loginFormControl: ['', Validators.required],
      passwordFormControl: ['', Validators.required],
      firstNameFormControl: ['', Validators.required],
      lastNameFormControl: ['', Validators.required],
      civilityFormControl: ['', Validators.required],
      phoneNumberFormControl: ['', Validators.required],
      addressFormControl: ['', Validators.required],
      cityFormControl: ['', Validators.required],
      postalCodeFormControl: ['', Validators.required],
      countryFormControl: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(userData => {
      if (!userData) return;

      this.updateUserAccountFormGroup.patchValue({
        emailFormControl: userData.email,
        loginFormControl: userData.login,
        passwordFormControl: userData.password,
        firstNameFormControl: userData.firstName,
        lastNameFormControl: userData.lastName,
        civilityFormControl: userData.civility,
        phoneNumberFormControl: userData.phoneNumber,
        addressFormControl: userData.address,
        cityFormControl: userData.city,
        postalCodeFormControl: userData.postalCode,
        countryFormControl: userData.country,
      });

      this.countryIsoCode = this.countries.find(country => country === userData.countryCode) || TuiCountryIsoCode.FR;
      this.userId = userData.id!;
    });
  }

  updateUserAccount() {
    const user = {
      id: this.userId,
      email: this.updateUserAccountFormGroup.value.emailFormControl!,
      login: this.updateUserAccountFormGroup.value.loginFormControl!,
      password: this.updateUserAccountFormGroup.value.passwordFormControl!,
      firstName: this.updateUserAccountFormGroup.value.firstNameFormControl!,
      lastName: this.updateUserAccountFormGroup.value.lastNameFormControl!,
      civility: this.updateUserAccountFormGroup.value.civilityFormControl!,
      countryCode: this.countryIsoCode,
      phoneNumber: this.updateUserAccountFormGroup.value.phoneNumberFormControl!,
      address: this.updateUserAccountFormGroup.value.addressFormControl!,
      city: this.updateUserAccountFormGroup.value.cityFormControl!,
      postalCode: this.updateUserAccountFormGroup.value.postalCodeFormControl!,
      country: this.updateUserAccountFormGroup.value.countryFormControl!,
    }

    this.authService.update(user).subscribe(
      success => {
        // handle success
      },
      error => {
        // handle error
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
