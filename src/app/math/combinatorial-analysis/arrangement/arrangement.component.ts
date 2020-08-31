import { Component, OnInit, Input } from '@angular/core';
import { ElementInputService } from '../element-input/element-input.service';
import { FormGroup } from '@angular/forms';
import { MathService } from '../../math.service';
import MathUtils from '../../math-utils';
import { MatDialog } from '@angular/material';
import { WarningModalComponent } from 'src/app/shared/modal/warning-modal/warning-modal.component';

@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrls: ['./arrangement.component.scss']
})
export class ArrangementComponent implements OnInit {

  constructor(
    private elementInputService: ElementInputService,
    private mathService: MathService,
    private dialogService: MatDialog
  ) {
    this.form = elementInputService.elementsForm;
  }

  form: FormGroup;

  @Input()
  operation: 'permutation' | 'arrangement' | 'combination';

  results: string[] = [];
  equation = '';

  get showResult(): boolean {
    return this.results.length > 0;
  }


  ngOnInit() {
  }

  get title(): string {
    switch (this.operation) {
      case 'permutation': return 'Permutações';
      case 'arrangement': return 'Arranjos';
      case 'combination': return 'Combinações';
      default: return '';
    }
  }

  calculate() {
    const values = this.elementInputService.getValues();

    switch(this.operation) {
      case 'permutation':
        this.performPermutation(values);
        break;
      case 'arrangement':
        if (!this.checkDuplicatedElementsForArrangements(values)) {
          this.performArrangement(values, this.form.get('taken').value);
        }
        break;
      case 'combination':
        if (!this.checkDuplicatedElementsForArrangements(values)) {
          this.performCombination(values, this.form.get('taken').value);
        }
        break;
    }
    MathUtils.refreshMathJaxContainers();
  }

  private performPermutation(elements: string[]) {
    const permutations = this.mathService.getAllPermutations(elements).map(p => p.join(','));
    this.results = [...new Set(permutations)];

    const n = elements.length;
    const repeated = MathUtils.getRepeatedElements(elements);
    this.equation = `\\( \\displaystyle ${MathUtils.buildPermutationExpression(n, repeated, this.results.length)} \\)`;
  }

  private performArrangement(elements: string[], p: number) {
    const arrangements = this.mathService.getAllArrangements(elements, p).map(a => a.join(','));
    this.results = [...new Set(arrangements)];

    const n = elements.length;
    this.equation = `\\( \\displaystyle ${MathUtils.buildArrangementExpression(n, p, this.results.length)} \\)`;
  }

  private performCombination(elements: string[], p: number) {
    const combinations = this.mathService.getAllCombinations(elements, p).map(a => a.join(','));
    this.results = [...new Set(combinations)];

    const n = elements.length;
    this.equation = `\\( \\displaystyle ${MathUtils.buildCombinationExpression(n, p, this.results.length)} \\)`;
  }

  private checkDuplicatedElementsForArrangements(elements: string[]) {
    const repeated = MathUtils.getRepeatedElements(elements);
    if (repeated.length > 0) {
      this.dialogService.open(WarningModalComponent, {
        data: {
          title: 'Atenção',
          message: `Para fazer ${this.title.toLowerCase()}, os elementos devem ser distintos`
        },
      });
      this.results = [];
      return true;
    }
    return false;
  }
}
