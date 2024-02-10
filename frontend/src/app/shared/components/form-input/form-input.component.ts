import {Component, Input} from '@angular/core';
import {TuiInputModule} from "@taiga-ui/kit";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
  selector: 'app-form-input',
  standalone: true,
    imports: [
      TuiInputModule,
      ReactiveFormsModule,
      TuiTextfieldControllerModule,
    ],
  templateUrl: './form-input.component.html'
})
export class FormInputComponent {
  @Input() label: string = '';
  @Input() controlName: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() parentForm!: FormGroup;
}
