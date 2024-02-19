import { Pipe, type PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, search: string): SafeHtml {
    const highlight = `<span class="bg-[#008C45]  text-white">${search}</span>`;
    const regex = new RegExp(search, 'gi');
    const highlighted = text.replace(regex, highlight);
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
}
