import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {TranslocoPipe} from "@ngneat/transloco";
import {FormInputComponent} from "../../../../shared/components/form-input/form-input.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {TabComponent} from "../../models/tab-component.interface";
import {
  TUI_COUNTRIES, TuiCheckboxModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule, TuiFilterByInputPipeModule,
  TuiInputModule,
  TuiInputPhoneInternationalModule
} from "@taiga-ui/kit";
import {TuiCountryIsoCode} from "@taiga-ui/i18n";
import {mapCountryNames} from "../../../../shared/utils/taiga-country-name-mapper";
import {TuiLetModule, TuiMapperPipeModule} from "@taiga-ui/cdk";
import {AsyncPipe, CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {TuiButtonModule, TuiDataListModule, TuiNotificationModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {RouterLink} from "@angular/router";

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
  ],
  templateUrl: './my-details.component.html'
})
export class MyDetailsComponent implements TabComponent {

  updateUserAccountFormGroup = new FormGroup({
    emailFormControl: new FormControl(''),
    loginFormControl: new FormControl(''),
    passwordFormControl: new FormControl(''),
    firstNameFormControl: new FormControl(''),
    lastNameFormControl: new FormControl(''),
    civilityFormControl: new FormControl(''),
    phoneNumberFormControl: new FormControl(''),
    addressFormControl: new FormControl(''),
    cityFormControl: new FormControl(''),
    postalCodeFormControl: new FormControl(''),
    countryFormControl: new FormControl(''),
  });

  countries: TuiCountryIsoCode[] = Object.values(TuiCountryIsoCode)
  countryNameMapper = mapCountryNames;
  countryIsoCode = TuiCountryIsoCode.FR;

  constructor(private userService: UserService, @Inject(TUI_COUNTRIES) readonly countriesNames$: Observable<Record<TuiCountryIsoCode, string>>)
  {
    const userData = this.userService.getUserData();
    if (userData) {
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
      }
  }

}
