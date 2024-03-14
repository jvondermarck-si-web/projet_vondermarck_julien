import { Component } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { CardService } from '../../services/card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html'
})
export class CardListComponent {
  cards$: Observable<Card[]>;

  constructor(private cardService: CardService) {
    this.cards$ = this.cardService.cards$;
  }

  deleteCard(code: string) {
    this.cardService.deleteCard(code);
  }
}
