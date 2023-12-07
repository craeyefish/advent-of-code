import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-q1',
  templateUrl: './q1.component.html',
  styleUrls: ['./q1.component.css'],
})
export class Q1Component {
  constructor(private http: HttpClient) {}

  q1Answer1: string | undefined;
  q1Answer2: string | undefined;

  q1() {
    this.http
      .get('assets/q1.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a1a(arr);
        this.a1b(arr);
      });
  }

  a1a(arr: string[]): void {
    var total = 0;

    for (var i = 0; i < arr.length; i++) {
      var first = 0;
      var last = 0;
      for (var j = 0; j < arr[i].length; j++) {
        if (isNaN(parseInt(arr[i][j]))) {
          continue;
        }

        if (first == 0) {
          first = parseInt(arr[i][j]);
        } else {
          last = parseInt(arr[i][j]);
        }
      }

      if (last == 0) {
        last = first;
      }

      var current = first * 10 + last;

      total = total + current;
    }

    this.q1Answer1 = total.toString();
  }

  a1b(arr: string[]): void {
    var total = 0;

    for (var i = 0; i < arr.length; i++) {
      var first = 0;
      var last = 0;
      var letters = '';
      for (var j = 0; j < arr[i].length; j++) {
        var digit = 0;

        if (isNaN(parseInt(arr[i][j]))) {
          letters = letters + arr[i][j];
          if (letters.includes('one')) {
            digit = 1;
          } else if (letters.includes('two')) {
            digit = 2;
          } else if (letters.includes('three')) {
            digit = 3;
          } else if (letters.includes('four')) {
            digit = 4;
          } else if (letters.includes('five')) {
            digit = 5;
          } else if (letters.includes('six')) {
            digit = 6;
          } else if (letters.includes('seven')) {
            digit = 7;
          } else if (letters.includes('eight')) {
            digit = 8;
          } else if (letters.includes('nine')) {
            digit = 9;
          } else {
            continue;
          }
        } else {
          digit = parseInt(arr[i][j]);
        }
        letters = '';

        if (first == 0) {
          first = digit;
        } else {
          last = digit;
        }
      }

      if (last == 0) {
        last = first;
      }

      var current = first * 10 + last;

      total = total + current;
    }

    this.q1Answer2 = total.toString();
  }
}
