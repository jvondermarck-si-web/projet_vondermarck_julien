import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html'
})
export class CardFormComponent implements OnInit {
  readonly form = new FormGroup({
      name: new FormControl('', Validators.required),
      code: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      ccv: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]),
      month: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(12)]),
      year: new FormControl(null, Validators.required),
  });

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.form.value)
  }

  get card(): string | null {
    const value: string | null | undefined = this.form.get('code')?.value;

    if ((value?.length ?? 0) < 7) {
        return null;
    }

    return null;
  }

  onSubmit() {
    if (this.form.valid) {
        // create card and add it to the list
        let card: Card = {
            name: this.form.value.name!,
            code: this.form.value.code!,
            ccv: this.form.value.ccv!,
            month: this.form.value.month!,
            year: this.form.value.year!
        };
        this.cardService.addCard(card);
        this.form.reset();
    }
  }
}