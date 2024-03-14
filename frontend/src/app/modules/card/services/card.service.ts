import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards = new BehaviorSubject<Card[]>([]);
  cards$ = this.cards.asObservable();

  addCard(card: Card) {
    this.cards.next([...this.cards.value, card]);
  }

  deleteCard(code: string) {
    this.cards.next(this.cards.value.filter(card => card.code !== code));
  }
}