import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  constructor(private readonly _elementRef: ElementRef) {}

  @Input()
  enabled: boolean;

  @Output()
  clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:pointerdown', ['$event', '$event.target'])
  @HostListener('document:touchstart', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    console.log('clicked outside');
    if (!targetElement || !this.enabled) {
      return;
    }

    const clickedInside =
      this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}

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
