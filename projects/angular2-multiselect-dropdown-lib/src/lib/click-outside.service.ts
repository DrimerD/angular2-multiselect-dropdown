import { DOCUMENT } from '@angular/common';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ClickOutsideService {
  // tslint:disable-next-line:variable-name
  private readonly _items = new Set<string>();

  // tslint:disable-next-line:variable-name
  private readonly _click$ = new Subject<MouseEvent>();

  // tslint:disable-next-line:variable-name
  private _docSub: Subscription | undefined;

  constructor(
    @Inject(DOCUMENT)
    private readonly _document: Document,
  ) {}

  register(item: string): void {
    this._items.add(item);

    if (this._items.size === 1) {
      this._subscribeToDocument();
    }
  }

  unregister(item: string): void {
    this._items.delete(item);

    if (this._items.size === 0) {
      this._unsubscribe();
    }
  }

  onClick(): Observable<MouseEvent> {
    // return observable of document click/pointer events
    return this._click$.asObservable();
  }

  private _subscribeToDocument(): void {
    if (this._docSub) {
      return;
    }

    // listen to touchstart / pointerdown / mousedown and forward events
    this._docSub = merge(
      fromEvent<MouseEvent>(this._document.defaultView, 'touchstart'),
      fromEvent<MouseEvent>(this._document.defaultView, 'pointerdown'),
    ).subscribe((event: MouseEvent) => this._click$.next(event));
  }

  private _unsubscribe(): void {
    if (this._docSub) {
      this._docSub.unsubscribe();
      this._docSub = undefined;
    }
  }
}
