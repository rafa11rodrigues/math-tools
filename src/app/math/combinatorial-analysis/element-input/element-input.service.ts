import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ElementInputService {

  constructor() { }

  elementsForm = new FormGroup({
    type: new FormControl('word', Validators.required),
    word: new FormControl(''),
    elements: new FormArray([]),
    taken: new FormControl(0, Validators.min(0))
  });

  get type(): 'word' | 'elements' {
    return this.elementsForm.value.type;
  }

  get typeForm(): FormControl {
    return this.elementsForm.get('type') as FormControl;
  }

  get wordForm(): FormControl {
    return this.elementsForm.get('word') as FormControl;
  }

  get takenForm(): FormControl {
    return this.elementsForm.get('taken') as FormControl;
  }

  get elements(): FormArray {
    return this.elementsForm.get('elements') as FormArray;
  }

  addElement() {
    this.elements.push(new FormControl(''));
  }

  removeElement(i: number) {
    this.elements.removeAt(i);
  }

  private removeSpaces(str: string): string {
    return str.replace(/ +/g, '');
  }

  changeType(type: 'word' | 'elements') {
    if (type === 'word') {
      this.changeToWord();
    } else {
      this.changeToElements();
    }
  }

  private changeToWord() {
    this.removeBlankElements();
    const elementsValues = this.elements.value as string[];
    const joined = elementsValues.map(e => this.removeSpaces(e)).join('');
    this.elementsForm.get('word').setValue(joined);
  }

  private changeToElements() {
    const wordValue = this.elementsForm.get('word').value as string;
    const splited = this.removeSpaces(wordValue).split('');
    this.elements.clear();
    splited.forEach(e => {
      this.elements.push(new FormControl(e));
    });
  }

  removeBlankElements() {
    const nonBlankElements = this.elements.controls.filter(e => e.value.trim() !== '');
    this.elements.clear();
    nonBlankElements.forEach(e => {
      e.setValue(this.removeSpaces(e.value));
      this.elements.push(e);
    });
  }

  getValues(): string[] {
    if (this.type === 'word') {
      return this.removeSpaces(this.elementsForm.get('word').value).split('');
    }
    this.removeBlankElements();
    return this.elements.value;
  }
}
