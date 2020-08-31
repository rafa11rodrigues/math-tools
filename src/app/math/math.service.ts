import { Injectable } from '@angular/core';
import MathUtils from './math-utils';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  factorial(n: number) {
    if (n < 0) {
      throw Error('"n" must be greater than or equal to 0');
    }

    let f = 1;
    for (let i = 2; i <= n; i++) {
      f *= i;
    }
    return f;
  }

  getAllPermutations(elements: any[]): Array<any[]> {
    const permutations = [];

    let hasPermutation = true;
    const indices = MathUtils.getIndices(elements);

    while (hasPermutation) {
      const permutated = MathUtils.permutate(elements, indices);
      permutations.push(permutated);

      hasPermutation = false;
      for (let k = elements.length - 2; k >= 0; k--) {
        if (indices[k] < indices[k + 1]) {
          const indexToSwap = MathUtils.findIndexToSwap(k, indices);
          MathUtils.swap(indices, k, indexToSwap);
          MathUtils.sortSubSequence(indices, k + 1);
          hasPermutation = true;
          break;
        }
      }
    }
    return permutations;
  }

  getAllCombinations(elements: any[], p: number): Array<any[]> {
    if (p === 0) { return [[]]; }
    if (p === 1) { return elements.map(e => [e]); }
    if (p < 0 || p > elements.length) {
      throw Error(`'p' must be between 0 and 'n'`);
    }

    const combinations = [];

    for (let i = 0; i <= elements.length - p; i++) {
      const first = elements[i];
      const remainingCombinations = this.getAllCombinations(elements.slice(i + 1), p - 1);
      if (remainingCombinations.length === 0) {
        combinations.push([first]);
      } else {
        remainingCombinations.forEach(c => {
          combinations.push([first, ...c]);
        });
      }
    }
    return combinations;
  }

  getAllArrangements(elements: any[], p: number): Array<any[]> {
    if (p < 0 || p > elements.length) {
      throw Error(`'p' must be between 0 and 'n'`);
    }

    const arrangements = [];

    const combinations = this.getAllCombinations(elements, p);
    combinations.forEach(c => {
      const permutations = this.getAllPermutations(c);
      permutations.forEach(p => {
        arrangements.push(p);
      });
    });
    return arrangements;
  }
}
