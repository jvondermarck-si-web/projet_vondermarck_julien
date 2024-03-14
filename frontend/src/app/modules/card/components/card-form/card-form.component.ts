import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html'
})
export class CardFormComponent {
  readonly form = new FormGroup({
      name: new FormControl(''),
      code: new FormControl(''),
      ccv: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
  });

  constructor(private cardService: CardService) {}

  get card(): string | null {
    const value: string | null | undefined = this.form.get('code')?.value;

    if ((value?.length ?? 0) < 7) {
        return null;
    }

    // ... rest of your code ...

      return null;
  }

  onSubmit() {
    if (this.form.valid) {
        // create card and add it to the list
        let card: Card = {
            name: this.form.value.name || '',
            code: this.form.value.code || '',
            ccv: this.form.value.ccv || '',
            month: this.form.value.month || '',
            year: this.form.value.year || ''
        };
        this.cardService.addCard(card);
        this.form.reset();
    }
}
}