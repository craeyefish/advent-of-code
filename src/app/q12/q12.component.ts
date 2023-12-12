import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q12',
  templateUrl: './q12.component.html',
  styleUrls: ['./q12.component.css'],
})
export class Q12Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q12();
  }

  q12Answer1: string | undefined;
  q12Answer2: string | undefined;

  q12() {
    this.http
      .get('assets/q12.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        // this.a12a(arr);
        this.a12b(arr);
      });
  }

  a12a(arr: string[]): void {
    let total = 0;

    for (var i = 0; i < arr.length; i++) {
      let rowTotal = 0;
      let input = arr[i].split(' ')[0];
      let nums = arr[i]
        .split(' ')[1]
        .split(',')
        .map((x) => parseInt(x));

      total += this.calc(input, nums);
    }

    this.q12Answer1 = total.toString();
  }

  a12b(arr: string[]): void {
    let total = 0;

    let inititalTotals: number[] = [];
    let forwardTotals: number[] = [];
    let backwardTotals: number[] = [];
    let finalTotals: number[] = [];

    // Calculate vanilla strings
    for (var i = 0; i < arr.length; i++) {
      let rowTotal = 0;
      let input = arr[i].split(' ')[0];
      let nums = arr[i]
        .split(' ')[1]
        .split(',')
        .map((x) => parseInt(x));

      rowTotal = this.calc(input, nums);

      inititalTotals.push(rowTotal);
    }

    // Calculate string + "?"
    for (var i = 0; i < arr.length; i++) {
      let rowTotal = 0;
      let inputT = arr[i].split(' ')[0];
      let nums = arr[i]
        .split(' ')[1]
        .split(',')
        .map((x) => parseInt(x));

      let input = '';
      let isQ = false;

      if (inputT[inputT.length - 1] == '.') {
        input = '?' + inputT;
      } else if (inputT[inputT.length - 1] == '#') {
        input = inputT;
      } else if (inputT[inputT.length - 1] == '?') {
        isQ = true;
        input = '?' + inputT;
      }

      rowTotal = this.calc(input, nums);

      if (!isQ) {
        forwardTotals.push(rowTotal);
        finalTotals.push(rowTotal);
        continue;
      }

      input = inputT + '?';

      let rowTotal2 = this.calc(input, nums);

      if (rowTotal2 > rowTotal) {
        rowTotal = rowTotal2;
      }

      forwardTotals.push(rowTotal);
      finalTotals.push(rowTotal);
    }

    console.log(inititalTotals);
    console.log(forwardTotals);
    console.log(backwardTotals);
    console.log(finalTotals);
    for (var i = 0; i < inititalTotals.length; i++) {
      let cur = inititalTotals[i] * Math.pow(finalTotals[i], 4);
      console.log(cur);
      total += cur;
    }

    this.q12Answer2 = total.toString();
  }

  calc(input: string, nums: number[]): number {
    let count = 0;
    let qCount = 0;

    for (var j = 0; j < input.length; j++) {
      if (input[j] == '?') {
        qCount += 1;
      }
    }

    for (var j = 0; j < Math.pow(2, qCount); j++) {
      let qInput = '';
      for (var k = 0; k < qCount; k++) {
        if (j & Math.pow(2, k)) {
          qInput += '#';
        } else {
          qInput += '.';
        }
      }

      let qAdded = 0;
      let modInput = input;
      for (var k = 0; k < qCount; k++) {
        modInput = modInput.replace('?', qInput[qAdded]);
        qAdded += 1;
      }

      if (this.isPossible(modInput, nums)) {
        count += 1;
      }
    }

    return count;
  }

  isPossible(input: string, nums: number[]): boolean {
    let cur = 0;
    let answers: number[] = [];
    for (var i = 0; i < input.length; i++) {
      if (input[i] == '#') {
        cur += 1;

        if (i + 1 == input.length) {
          answers.push(cur);
        }
        continue;
      }

      if (cur > 0) {
        answers.push(cur);
      }
      cur = 0;
    }

    if (answers.length != nums.length) {
      return false;
    }

    for (var i = 0; i < nums.length; i++) {
      if (answers[i] != nums[i]) {
        return false;
      }
    }

    return true;
  }
}
