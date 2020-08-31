import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Output()
  menuTriggered = new EventEmitter();

  ngOnInit() {
  }

  triggerMenu() {
    this.menuTriggered.emit();
  }
}
