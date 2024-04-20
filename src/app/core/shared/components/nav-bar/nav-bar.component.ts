import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Output() OnToogle: EventEmitter<boolean>  = new EventEmitter<boolean>();
  @Input()   isToogle: boolean = false;

  toogle() {
    this.isToogle = !this.isToogle;
   this.OnToogle.emit(this.isToogle);
  }
}
