import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  public emitValue( value: string ) {
    this.onValue.emit( value );
  }

  public onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(400)
      )
      .subscribe( value => {
        this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }
}
