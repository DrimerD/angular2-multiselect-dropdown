import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[scroll]',
})
export class ScrollDirective {
  @Output()
  public scroll = new EventEmitter<MouseEvent>();

  @HostListener('scroll', ['$event'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    this.scroll.emit(event);
  }
}
