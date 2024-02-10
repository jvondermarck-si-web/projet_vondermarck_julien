import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './nav-item.component.html'
})
export class NavItemComponent {

  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() isLastItem: boolean = false;
  @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();

  onClick(): void {
    this.tabSelected.emit(this.label);
  }
}
