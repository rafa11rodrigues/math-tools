import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss']
})
export class NavmenuComponent implements AfterViewInit {

  constructor() { }

  items: NodeListOf<HTMLElement>;

  @Output()
  itemSelected = new EventEmitter();


  ngAfterViewInit() {
    this.items = document.querySelectorAll('.menu__item');
    this.handleEvents();
  }

  private handleEvents() {
    this.items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.closeOnClick();
      });

      item.addEventListener('keydown', (evt: KeyboardEvent) => {
        this.move(evt, index);
      });
    });
  }

  private closeOnClick() {
    this.itemSelected.emit();
  }

  private move(evt: KeyboardEvent, currentItem: number) {
    const totalItems = this.items.length;
    let nextItem = currentItem;

    if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      nextItem = (currentItem + totalItems - 1) % totalItems;
    }
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      nextItem = (currentItem + 1) % totalItems;
    }

    if (nextItem !== currentItem) {
      this.items[nextItem].focus();
    }
  }
}

