declare const MathJax;

export default class MathUtils {

  public static refreshMathJaxContainers() {
    const containers = document.querySelectorAll('mjx-container');
    containers.forEach(c => {
      c.remove();
    });
    setTimeout(() => {
      MathJax.typeset();
    }, 50);
  }

  public static findIndexToSwap(k: number, elements: number[]) {
    let indexToSwap = k + 1;
    for (let i = indexToSwap + 1; i < elements.length; i++) {
      if (elements[i] > elements[k] && elements[i] < elements[indexToSwap]) {
        indexToSwap = i;
      }
    }
    return indexToSwap;
  }

  public static swap(elements: any[], i: number, j: number) {
    if (i !== j) {
      const aux = elements[i];
      elements[i] = elements[j];
      elements[j] = aux;
    }
  }

  public static sortSubSequence(elements: number[], start: number) {
    for (let i = start; i < elements.length - 1; i++) {
      let m = i;
      for (let j = i + 1; j < elements.length; j++) {
        if (elements[j] < elements[m]) {
          m = j;
        }
      }
      this.swap(elements, i, m);
    }
  }

  public static permutate(elements: any[], indices: number[]) {
    const copy = elements.slice(0);

    // tslint:disable-next-line: forin
    for (let i in copy) {
      copy[i] = elements[indices[i]];
    }
    return copy;
  }

  public static getIndices(elements: any[]) {
    return elements.map((_, i) => i);
  }

  public static getRepeatedElements(elements: string[]): number[] {
    const frequency = {};
    elements.forEach(e => {
      if (!frequency[e]) {
        frequency[e] = 0;
      }
      frequency[e]++;
    });
    const repeated = Object.keys(frequency).filter(e => frequency[e] > 1);
    return repeated.map(e => frequency[e]).sort((a, b) => b - a);
  }

  public static decomposeFactors(n: number, until: number = 1): number[] {
    if (n === 0) { return []; }

    const factors = [];
    while (n >= until) {
      factors.push(n);
      n--;
    }
    return factors;
  }

  public static joinFactors(factors: any[]): string {
    return factors.join(' \\cdot ');
  }

  public static buildFactorialExpression(n: number, result: number) {
    const factors = MathUtils.decomposeFactors(n);

    let expression = `${n}! = `;
    if (factors.length > 1) {
      expression += `${MathUtils.joinFactors(factors)} =`;
    }
    expression += `${result}`;
    return expression;
  }

  public static buildPermutationExpression(n: number, repeated: number[], result: number): string {
    let expression = `P_{${n}}`;

    if (repeated.length > 0) {
      expression += `^{(${repeated.join(', ')})}`;
    }
    if (repeated.length === 0) {
      return `${expression} = ${MathUtils.buildFactorialExpression(n, result)}`;
    }

    const numerator = `${n}!`;
    const denominator = MathUtils.joinFactors(repeated.map(r => `${r}!`));
    const fraction = MathUtils.buildFractionExpression(numerator, denominator);
    return `${expression} = ${fraction} = ${result}`;
  }

  public static buildArrangementExpression(n: number, p: number, result: number): string {
    const expression = `A_{${n}}^{${p}}`;

    const numerator = `${n}!`;
    const denominator = `(${n} - ${p})!`;
    const fraction = MathUtils.buildFractionExpression(numerator, denominator);
    return `${expression} = ${fraction} = ${result}`;
  }

  public static buildCombinationExpression(n: number, p: number, result: number): string {
    const expression = `C_{${n}}^{${p}}`;

    const numerator = `${n}!`;
    const denominator = `${p}!(${n} - ${p})!`;
    const fraction = MathUtils.buildFractionExpression(numerator, denominator);
    return `${expression} = ${fraction} = ${result}`;
  }

  public static buildFractionExpression(numerator: string, denominator: string): string {
    return `\\frac{${numerator}}{${denominator}}`;
  }
}
