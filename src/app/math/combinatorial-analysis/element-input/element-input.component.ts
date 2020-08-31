import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ElementInputService } from './element-input.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-element-input',
  templateUrl: './element-input.component.html',
  styleUrls: ['./element-input.component.scss']
})
export class ElementInputComponent {

  constructor(private elementInputService: ElementInputService) {
    this.form = this.elementInputService.elementsForm;
  }

  form: FormGroup;

  @Input()
  isPermutation = true;

  @Output()
  submitted = new EventEmitter();

  totalElements = 0;

  updateTakenValidators() {
    this.totalElements = this.elementInputService.getValues().length;
    const taken = this.form.get('taken');
    taken.clearValidators();
    if (!this.isPermutation) {
      taken.setValidators([Validators.required, Validators.min(0), Validators.max(this.totalElements)]);
      taken.updateValueAndValidity();
    }
  }

  get type(): 'word' | 'elements' {
    return this.elementInputService.type;
  }

  get elements() {
    return this.elementInputService.elements;
  }

  onSubmit() {
    this.updateTakenValidators();
    if (this.form.valid) {
      this.submitted.emit();
    }
  }

  addElement() {
    this.elementInputService.addElement();
  }

  removeElement(i: number) {
    this.elementInputService.removeElement(i);
  }

  changeType(evt: MatRadioChange) {
    this.elementInputService.changeType(evt.value);
  }
}
