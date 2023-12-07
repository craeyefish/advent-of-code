import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-q2',
  templateUrl: './q2.component.html',
  styleUrls: ['./q2.component.css'],
})
export class Q2Component {
  constructor(private http: HttpClient) {}

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
}
