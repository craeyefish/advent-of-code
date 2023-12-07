import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-q4',
  templateUrl: './q4.component.html',
  styleUrls: ['./q4.component.css'],
})
export class Q4Component {
  constructor(private http: HttpClient) {}

  // q4
  q4Answer1: string | undefined;
  q4Answer2: string | undefined;
  q4Time = '~120 min :(';
  q4Nums: number[] | undefined;

  q4() {
    this.http
      .get('assets/q4.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a4a(arr);
        this.a4b(arr);
      });
  }

  a4a(arr: string[]): void {
    var total = 0;

    for (var i = 0; i < arr.length; i++) {
      var str = arr[i].split(':')[1];
      var winning = str.split('|')[0];
      var nums = str.split('|')[1];

      var correct = 0;

      nums
        .trim()
        .split(' ')
        .forEach((n) => {
          winning
            .trim()
            .split(' ')
            .forEach((w) => {
              if (n == w && n != '') {
                correct = correct + 1;
              }
            });
        });

      if (correct > 0) {
        total = total + Math.pow(2, correct - 1);
      }
    }

    this.q4Answer1 = total.toString();
  }

  a4bTotal: number | undefined;
  q4bCorrectCounts: number[] | undefined;

  a4b(arr: string[]): void {
    if (this.a4bTotal == undefined) {
      this.a4bTotal = 0;
    }

    let count: Array<number> = [0, 0, 0, 0, 0, 0];
    this.q4bCorrectCounts = count;

    for (var i = 0; i < arr.length; i++) {
      var str = arr[i].split(':')[1];
      var winning = str.split('|')[0];
      var nums = str.split('|')[1];

      var correct = 0;

      nums
        .trim()
        .split(' ')
        .forEach((n) => {
          winning
            .trim()
            .split(' ')
            .forEach((w) => {
              if (n == w && n != '') {
                correct = correct + 1;
              }
            });
        });

      this.q4bCorrectCounts[i] = correct;
    }

    this.scratch(0, arr.length);

    this.q4Answer2 = this.a4bTotal.toString();
  }

  scratch(start: number, amount: number): void {
    this.a4bTotal! += amount;

    for (var i = 0; i < amount; i++) {
      var correct = this.q4bCorrectCounts![start + i];

      if (correct > 0) {
        this.scratch(start + 1 + i, correct);
      }
    }
  }
}
