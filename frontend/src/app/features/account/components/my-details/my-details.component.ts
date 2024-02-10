import {Component, EventEmitter, Output} from '@angular/core';
import {TranslocoPipe} from "@ngneat/transloco";
import {FormInputComponent} from "../../../../shared/components/form-input/form-input.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-my-details',
  standalone: true,
  imports: [
    TranslocoPipe,
    FormInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './my-details.component.html'
})
export class MyDetailsComponent {

  @Output() backClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  constructor(private userService: UserService)
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

  goBackClick() {
    this.backClicked.emit(true);
  }
}
