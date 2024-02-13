import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField);
    const passwordConfirm = control.get(confirmPasswordField);

    if (password?.value !== passwordConfirm?.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}

