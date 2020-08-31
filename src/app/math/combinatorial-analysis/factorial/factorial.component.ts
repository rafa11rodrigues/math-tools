import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MathService } from '../../math.service';
import MathUtils from '../../math-utils';

declare const MathJax;

@Component({
  selector: 'app-factorial',
  templateUrl: './factorial.component.html',
  styleUrls: ['./factorial.component.scss']
})
export class FactorialComponent implements OnInit {

  constructor(private mathService: MathService) { }

  form = new FormGroup({
    n: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  n = 0;
  result = 1;

  showResult = false;

  factors = [];
  expression = '';


  ngOnInit() {
  }

  calculate() {
    if (this.form.invalid) { return; }

    this.n = this.form.value.n;
    this.result = this.mathService.factorial(this.n);
    this.updateFactors();
    this.showResult = true;
    this.expression = this.buildExpression();
    MathUtils.refreshMathJaxContainers();
  }

  updateFactors() {
    this.factors = [];
    let n = this.n;
    while (n > 0) {
      this.factors.push(n);
      n--;
    }
  }

  buildExpression() {
    let expression = `\\( ${this.n}! = `;
    if (this.factors.length > 1) {
      expression += `${this.factors.join(' \\cdot ')} =`;
    }
    expression += `${this.result} \\)`;
    return expression;
  }
}
