import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q14',
  templateUrl: './q14.component.html',
  styleUrls: ['./q14.component.css'],
})
export class Q14Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q14();
  }

  q14Answer1: string | undefined;
  q14Answer2: string | undefined;
  total2: number = 0;

  q14() {
    this.http
      .get('assets/q14.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a14a(arr);
        this.a14b(arr);
      });
  }

  a14a(arr: string[]): void {
    let total = 0;

    let answers: number[] = [];

    for (var i = 0; i < 1020; i++) {
      if (i > 1000) {
        let v = this.calc(arr);
        answers.push(v);
      }

      arr = this.roll(arr);
      arr = this.roll(arr);
      arr = this.roll(arr);
      arr = this.roll(arr);
    }

    let repeatLen = 0;
    for (var i = 0; i < answers.length; i++) {
      let count = 0;

      for (var j = 0; j < answers.length; j++) {
        if (answers[j] != answers[j % i]) {
          break;
        }

        count += 1;
      }

      if (count == answers.length) {
        repeatLen = i;
        console.log('Repeat length found!! ' + repeatLen);
        console.log(answers.slice(0, repeatLen));
        break;
      }
    }

    let pos = (1000000000 - 1000 - 1) % repeatLen;
    console.log(pos);
    console.log(answers[pos]);

    this.q14Answer1 = this.total2.toString();
  }

  a14b(arr: string[]): void {
    let total = 0;

    this.q14Answer2 = total.toString();
  }

  calc(arr: string[]): number {
    let total = 0;
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        if (arr[i][j] == 'O' || arr[i][j] == '0') {
          total += arr.length - i;
        }
      }
    }

    return total;
  }

  roll(arr: string[]): string[] {
    let total = 0;
    let newArr: string[] = [];
    for (var i = 0; i < arr[0].length; i++) {
      let result = '';
      let gap = '';
      for (var j = 0; j < arr.length; j++) {
        if (arr[j][i] == '.') {
          gap += '.';
          continue;
        }

        if (arr[j][i] == '#') {
          result += gap + '#';
          gap = '';
          continue;
        }

        result += '0';
      }

      result += gap;

      let count = arr.length;
      let lineTotal = 0;
      for (var j = 0; j < result.length; j++) {
        if (result[j] == '0') {
          lineTotal += count - j;
        }
      }
      total += lineTotal;

      newArr.push(result.split('').reverse().join(''));
    }

    this.total2 = total;
    return newArr;
  }
}
