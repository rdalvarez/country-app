import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [``]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = ''

  @Input()
  public value: string = ''

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  // @ViewChild('txtInput')
  // public inputText!: ElementRef<HTMLInputElement>

  emitValue(value: string): void {
    // const textInput = this.inputText.nativeElement.value;
    //console.log({'Search-Text:': value});
    this.onValue.emit( value );
  }
}
