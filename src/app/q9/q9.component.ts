import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q9',
  templateUrl: './q9.component.html',
  styleUrls: ['./q9.component.css'],
})
export class Q9Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q9();
  }

  q9Answer1: string | undefined;
  q9Answer2: string | undefined;

  q9() {
    this.http
      .get('assets/q9.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a9a(arr);
        this.a9b(arr);
      });
  }

  a9a(arr: string[]): void {
    let total = 0;

    for (var i = 0; i < arr.length; i++) {
      let nums = arr[i]
        .trim()
        .split(' ')
        .map((x) => parseInt(x));

      let diff: number[][] = [];
      diff.push(nums);

      let allZero = false;
      let count = 0;
      while (!allZero) {
        let curNums: number[] = [];
        let zeroCount = 0;
        for (var j = 0; j < diff[count].length - 1; j++) {
          let curDiff = diff[count][j + 1] - diff[count][j];
          if (curDiff == 0) {
            zeroCount += 1;
          }
          curNums.push(curDiff);
        }

        diff.push(curNums);
        count += 1;

        if (zeroCount == curNums.length) {
          allZero = true;
        }
      }

      let sum = 0;
      diff.forEach((x) => {
        sum += x[x.length - 1];
      });

      total += sum;
    }

    this.q9Answer1 = total.toString();
  }

  a9b(arr: string[]): void {
    let total = 0;

    for (var i = 0; i < arr.length; i++) {
      let nums = arr[i]
        .trim()
        .split(' ')
        .map((x) => parseInt(x));

      let diff: number[][] = [];
      diff.push(nums);

      let allZero = false;
      let count = 0;
      while (!allZero) {
        let curNums: number[] = [];
        let zeroCount = 0;
        for (var j = 0; j < diff[count].length - 1; j++) {
          let curDiff = diff[count][j + 1] - diff[count][j];
          if (curDiff == 0) {
            zeroCount += 1;
          }
          curNums.push(curDiff);
        }

        diff.push(curNums);
        count += 1;

        if (zeroCount == curNums.length) {
          allZero = true;
        }
      }

      let sum = 0;
      let sumAns: number[] = [];

      for (var j = diff.length - 1; j >= 0; j--) {
        sum = diff[j][0] - sum;
        sumAns.push(sum);
      }

      total += sum;
    }

    this.q9Answer2 = total.toString();
  }
}
