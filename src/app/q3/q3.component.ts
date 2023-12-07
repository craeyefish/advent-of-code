import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-q3',
  templateUrl: './q3.component.html',
  styleUrls: ['./q3.component.css'],
})
export class Q3Component {
  constructor(private http: HttpClient) {}

  // q3
  q3Answer1: string | undefined;
  q3Answer2: string | undefined;
  q3Time = '69 min';

  q3() {
    this.http
      .get('assets/q3.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a3a(arr);
        this.a3b(arr);
      });
  }

  a3a(arr: string[]): void {
    var total = 0;

    for (var i = 0; i < arr.length; i++) {
      var line = arr[i];

      var possible = false;
      var curNum = 0;

      for (var j = 0; j < line.length; j++) {
        if (isNaN(parseInt(line[j]))) {
          if (curNum != 0 && possible) {
            total = total + curNum;
          }
          curNum = 0;
          possible = false;
          continue;
        }

        curNum = curNum * 10 + parseInt(line[j]);

        // check left
        if (j > 0 && isNaN(parseInt(line[j - 1])) && line[j - 1] != '.') {
          possible = true;
        }

        // check right
        if (
          j < line.length - 1 &&
          isNaN(parseInt(line[j + 1])) &&
          line[j + 1] != '.'
        ) {
          possible = true;
        }

        // check up
        if (i > 0 && isNaN(parseInt(arr[i - 1][j])) && arr[i - 1][j] != '.') {
          possible = true;
        }

        // check down
        if (
          i < arr.length - 1 &&
          isNaN(parseInt(arr[i + 1][j])) &&
          arr[i + 1][j] != '.'
        ) {
          possible = true;
        }

        // check diagonal up left
        if (
          j > 0 &&
          i > 0 &&
          isNaN(parseInt(arr[i - 1][j - 1])) &&
          arr[i - 1][j - 1] != '.'
        ) {
          possible = true;
        }

        // check diagonal up right
        if (
          j < line.length - 1 &&
          i > 0 &&
          isNaN(parseInt(arr[i - 1][j + 1])) &&
          arr[i - 1][j + 1] != '.'
        ) {
          possible = true;
        }

        // check diagonal down left
        if (
          j > 0 &&
          i < arr.length - 1 &&
          isNaN(parseInt(arr[i + 1][j - 1])) &&
          arr[i + 1][j - 1] != '.'
        ) {
          possible = true;
        }

        // check diagonal down right
        if (
          j < line.length - 1 &&
          i < arr.length - 1 &&
          isNaN(parseInt(arr[i + 1][j + 1])) &&
          arr[i + 1][j + 1] != '.'
        ) {
          possible = true;
        }

        // last char in line
        if (j == line.length - 1) {
          if (curNum != 0 && possible) {
            total = total + curNum;
          }
          curNum = 0;
          possible = false;
        }
      }
    }

    this.q3Answer1 = total.toString();
  }

  a3b(arr: string[]): void {
    var total = 0;
    let myMap = new Map<string, number[]>();

    for (var i = 0; i < arr.length; i++) {
      var line = arr[i];

      var touchingStars = [''];
      var curNum = 0;

      for (var j = 0; j < line.length; j++) {
        if (isNaN(parseInt(line[j]))) {
          if (curNum != 0 && touchingStars) {
            touchingStars = touchingStars.filter(function (elem, index, self) {
              return index === self.indexOf(elem);
            });

            touchingStars.forEach((element) => {
              let curArr: number[] = [];
              if (
                myMap.get(element) != undefined &&
                myMap.get(element)?.length != 0
              ) {
                curArr = myMap.get(element)!;
              }
              curArr.push(curNum);
              myMap.set(element, curArr);
            });
          }
          curNum = 0;
          touchingStars = [''];
          continue;
        }

        curNum = curNum * 10 + parseInt(line[j]);

        // check left
        if (j > 0 && isNaN(parseInt(line[j - 1])) && line[j - 1] == '*') {
          touchingStars.push(i + '-' + (j - 1));
        }

        // check right
        if (
          j < line.length - 1 &&
          isNaN(parseInt(line[j + 1])) &&
          line[j + 1] == '*'
        ) {
          touchingStars.push(i + '-' + (j + 1));
        }

        // check up
        if (i > 0 && isNaN(parseInt(arr[i - 1][j])) && arr[i - 1][j] == '*') {
          touchingStars.push(i - 1 + '-' + j);
        }

        // check down
        if (
          i < arr.length - 1 &&
          isNaN(parseInt(arr[i + 1][j])) &&
          arr[i + 1][j] == '*'
        ) {
          touchingStars.push(i + 1 + '-' + j);
        }

        // check diagonal up left
        if (
          j > 0 &&
          i > 0 &&
          isNaN(parseInt(arr[i - 1][j - 1])) &&
          arr[i - 1][j - 1] == '*'
        ) {
          touchingStars.push(i - 1 + '-' + (j - 1));
        }

        // check diagonal up right
        if (
          j < line.length - 1 &&
          i > 0 &&
          isNaN(parseInt(arr[i - 1][j + 1])) &&
          arr[i - 1][j + 1] == '*'
        ) {
          touchingStars.push(i - 1 + '-' + (j + 1));
        }

        // check diagonal down left
        if (
          j > 0 &&
          i < arr.length - 1 &&
          isNaN(parseInt(arr[i + 1][j - 1])) &&
          arr[i + 1][j - 1] == '*'
        ) {
          touchingStars.push(i + 1 + '-' + (j - 1));
        }

        // check diagonal down right
        if (
          j < line.length - 1 &&
          i < arr.length - 1 &&
          isNaN(parseInt(arr[i + 1][j + 1])) &&
          arr[i + 1][j + 1] == '*'
        ) {
          touchingStars.push(i + 1 + '-' + (j + 1));
        }

        // last char in line
        if (j == line.length - 1) {
          if (curNum != 0 && touchingStars) {
            touchingStars = touchingStars.filter(function (elem, index, self) {
              return index === self.indexOf(elem);
            });

            touchingStars.forEach((element) => {
              let curArr: number[] = [];
              if (
                myMap.get(element) != undefined &&
                myMap.get(element)?.length != 0
              ) {
                curArr = myMap.get(element)!;
              }
              curArr.push(curNum);
              myMap.set(element, curArr);
            });
          }
          curNum = 0;
          touchingStars = [''];
        }
      }
    }

    for (let [key, value] of myMap) {
      if (value.length == 2) {
        total = total + value[0] * value[1];
      }
    }

    this.q3Answer2 = total.toString();
  }
}
