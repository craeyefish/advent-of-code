import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q11',
  templateUrl: './q11.component.html',
  styleUrls: ['./q11.component.css'],
})
export class Q11Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q11();
  }

  q11Answer1: string | undefined;
  q11Answer2: string | undefined;

  q11() {
    this.http
      .get('assets/q11.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        // this.a11a(arr);
        this.a11b(arr);
      });
  }

  a11a(arr: string[]): void {
    let total = 0;

    // expand system - y
    for (var i = arr.length - 1; i >= 0; i--) {
      let shouldExpand = true;
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] != '.') {
          shouldExpand = false;
        }
      }

      if (shouldExpand) {
        arr.splice(i, 0, arr[i]);
      }
    }

    // expand system - x
    for (var i = arr[0].length - 1; i >= 0; i--) {
      let shouldExpand = true;
      for (var j = 0; j < arr.length; j++) {
        if (arr[j][i] != '.') {
          shouldExpand = false;
        }
      }

      if (shouldExpand) {
        for (var j = 0; j < arr.length; j++) {
          let line = arr[j];
          const cipherChars = [...line];
          cipherChars.splice(i, 0, '.');
          arr[j] = cipherChars.join('');
        }
      }
    }

    let points: number[][] = [];
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == '#') {
          points.push([i, j]);
        }
      }
    }

    for (var i = 0; i < points.length; i++) {
      let line = arr[points[i][0]];
      const cipherChars = [...line];
      cipherChars[points[i][1]] = (i + 1).toString();
      arr[points[i][0]] = cipherChars.join('');

      for (var j = 0; j < points.length; j++) {
        if (points[i][0] == points[j][0] && points[i][1] == points[j][1]) {
          continue;
        }

        let dist =
          Math.abs(points[i][0] - points[j][0]) +
          Math.abs(points[i][1] - points[j][1]);

        total += dist;
      }
    }

    this.q11Answer1 = (total / 2).toString();
  }

  a11b(arr: string[]): void {
    let total = 0;

    let zeroColumns: number[] = [];
    let zeroRows: number[] = [];

    console.log('b');

    console.log(arr);

    // expand system - y
    for (var i = arr.length - 1; i >= 0; i--) {
      let shouldExpand = true;
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] != '.') {
          shouldExpand = false;
        }
      }

      if (shouldExpand) {
        zeroRows.push(i);
      }
    }

    // expand system - x
    for (var i = arr[0].length - 1; i >= 0; i--) {
      let shouldExpand = true;
      for (var j = 0; j < arr.length; j++) {
        if (arr[j][i] != '.') {
          shouldExpand = false;
        }
      }

      if (shouldExpand) {
        zeroColumns.push(i);
      }
    }

    console.log(zeroColumns);
    console.log(zeroRows);

    let points: number[][] = [];
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == '#') {
          points.push([i, j]);
        }
      }
    }

    for (var i = 0; i < points.length; i++) {
      let line = arr[points[i][0]];
      const cipherChars = [...line];
      cipherChars[points[i][1]] = (i + 1).toString();
      arr[points[i][0]] = cipherChars.join('');

      for (var j = 0; j < points.length; j++) {
        if (points[i][0] == points[j][0] && points[i][1] == points[j][1]) {
          continue;
        }

        let dist =
          Math.abs(points[i][0] - points[j][0]) +
          Math.abs(points[i][1] - points[j][1]);

        let startX = points[i][0] > points[j][0] ? points[j][0] : points[i][0];
        let endX = points[i][0] > points[j][0] ? points[i][0] : points[j][0];
        let startY = points[i][1] > points[j][1] ? points[j][1] : points[i][1];
        let endY = points[i][1] > points[j][1] ? points[i][1] : points[j][1];

        zeroRows.forEach((x) => {
          if (startX < x && endX > x) {
            dist += 999999;
          }
        });
        zeroColumns.forEach((y) => {
          if (startY < y && endY > y) {
            dist += 999999;
          }
        });

        total += dist;
      }
    }

    this.q11Answer2 = (total / 2).toString();
  }
}
