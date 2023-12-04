import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q1();
    this.q2();
    this.q3();
    this.q4();
  }

  // q1
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

  // q2
  q2Answer1: string | undefined;
  q2Answer2: string | undefined;
  q2Time = '47 min';

  q2() {
    this.http
      .get('assets/q2.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a2a(arr);
        this.a2b(arr);
      });
  }

  a2a(arr: string[]): void {
    var total = 0;

    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];

      var gameID = parseInt(str.split(':')[0].split(' ')[1]);
      var rolls = str.split(':')[1].split(';');

      var maxRed = 12;
      var maxGreen = 13;
      var maxBlue = 14;

      var possible = true;

      var last = 0;
      for (var j = 0; j < rolls.length; j++) {
        var draws = rolls[j].split(',');

        for (var k = 0; k < draws.length; k++) {
          var num = parseInt(draws[k].trimStart().split(' ')[0]);
          if (draws[k].includes('blue')) {
            if (num > maxBlue) {
              possible = false;
            }
          }
          if (draws[k].includes('red')) {
            if (num > maxRed) {
              possible = false;
            }
          }
          if (draws[k].includes('green')) {
            if (num > maxGreen) {
              possible = false;
            }
          }
        }
      }

      if (possible == true) {
        total = total + gameID;
      }
    }

    this.q2Answer1 = total.toString();
  }

  a2b(arr: string[]): void {
    var total = 0;

    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];

      var gameID = parseInt(str.split(':')[0].split(' ')[1]);
      var rolls = str.split(':')[1].split(';');

      var minRed = 0;
      var minGreen = 0;
      var minBlue = 0;

      var last = 0;
      for (var j = 0; j < rolls.length; j++) {
        var draws = rolls[j].split(',');

        for (var k = 0; k < draws.length; k++) {
          var num = parseInt(draws[k].trimStart().split(' ')[0]);
          if (draws[k].includes('blue')) {
            if (num > minBlue) {
              minBlue = num;
            }
          }
          if (draws[k].includes('red')) {
            if (num > minRed) {
              minRed = num;
            }
          }
          if (draws[k].includes('green')) {
            if (num > minGreen) {
              minGreen = num;
            }
          }
        }
      }

      total = total + minGreen * minRed * minBlue;
    }

    this.q2Answer2 = total.toString();
  }

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
