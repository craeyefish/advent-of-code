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
    let qBeforeTotals: number[] = [];
    let qAfterTotals: number[] = [];
    let finalTotals: number[] = [];
    let sumTotals: number[] = [];

    // Calculate vanilla strings
    console.log('calculating vanilla');
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

    // Calculate "?" + string
    console.log('calculating ? + string');
    for (var i = 0; i < arr.length; i++) {
      let rowTotal = 0;
      let inputT = arr[i].split(' ')[0];
      let input = '?' + inputT;
      let nums = arr[i]
        .split(' ')[1]
        .split(',')
        .map((x) => parseInt(x));

      if (inputT[inputT.length - 1] == '#') {
        qBeforeTotals.push(0);
        continue;
      }

      rowTotal = this.calc(input, nums);
      qBeforeTotals.push(rowTotal);
    }

    // Calculate string + "?"
    console.log('calculating string + ?');
    for (var i = 0; i < arr.length; i++) {
      let rowTotal = 0;
      let inputT = arr[i].split(' ')[0];
      let input = inputT + '?';
      let nums = arr[i]
        .split(' ')[1]
        .split(',')
        .map((x) => parseInt(x));

      if (inputT[0] == '#') {
        qAfterTotals.push(0);
        continue;
      }

      rowTotal = this.calc(input, nums);
      qAfterTotals.push(rowTotal);
    }

    console.log(inititalTotals);
    console.log(qBeforeTotals);
    console.log(qAfterTotals);

    for (var i = 0; i < inititalTotals.length; i++) {
      let bigger =
        qBeforeTotals[i] > qAfterTotals[i] ? qBeforeTotals[i] : qAfterTotals[i];
      bigger = bigger == 0 ? inititalTotals[i] : bigger;
      finalTotals.push(bigger);

      let cur1 = inititalTotals[i] * Math.pow(bigger, 4);
      let cur2 = bigger * Math.pow(inititalTotals[i], 4);

      let cur = cur1 > cur2 ? cur1 : cur2;

      sumTotals.push(cur);
      total += cur;
    }
    console.log(finalTotals);
    console.log(sumTotals);

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
