import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q13',
  templateUrl: './q13.component.html',
  styleUrls: ['./q13.component.css'],
})
export class Q13Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q13();
  }

  q13Answer1: string | undefined;
  q13Answer2: string | undefined;

  q13() {
    this.http
      .get('assets/q13.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a13a(arr);
        this.a13b(arr);
      });
  }

  a13a(arr: string[]): void {
    let total = 0;

    let curBlock: string[] = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != '') {
        curBlock.push(arr[i]);
        continue;
      }

      let vert = this.calcColumn(curBlock);
      let horiz = this.calcRow(curBlock);

      total += horiz * 100 + vert;

      curBlock = [];
    }

    this.q13Answer1 = total.toString();
  }

  calcColumn(block: string[]): number {
    let total = 0;

    // Assume i is the line to the left of the mirror.
    for (var i = 0; i < block[0].length - 1; i++) {
      let smallestDist =
        i + 1 < block[0].length - 1 - i ? i + 1 : block[0].length - 1 - i;

      if (smallestDist < 1) {
        continue;
      }

      let isMirror = true;
      for (var j = 0; j < smallestDist; j++) {
        let line1 = '';
        let line2 = '';

        for (var k = 0; k < block.length; k++) {
          line1 += block[k][i - j];
          line2 += block[k][i + 1 + j];
          if (block[k][i - j] != block[k][i + 1 + j]) {
            isMirror = false;
          }
        }

        if (!isMirror) {
          break;
        }
      }

      if (isMirror) {
        total += i + 1;
      }
    }

    return total;
  }

  calcRow(block: string[]): number {
    let total = 0;

    // Assume i is the line to the top of the mirror.
    for (var i = 0; i < block.length - 1; i++) {
      let smallestDist =
        i + 1 < block.length - 1 - i ? i + 1 : block.length - 1 - i;

      if (smallestDist < 1) {
        continue;
      }

      let isMirror = true;
      for (var j = 0; j < smallestDist; j++) {
        if (block[i - j] != block[i + 1 + j]) {
          isMirror = false;
          break;
        }
      }

      if (isMirror) {
        total += i + 1;
      }
    }

    return total;
  }

  a13b(arr: string[]): void {
    let total = 0;

    let curBlock: string[] = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != '') {
        curBlock.push(arr[i]);
        continue;
      }

      let vert = this.fixColumnSmudge(curBlock);
      let horiz = this.fixRowSmudge(curBlock);

      total += horiz * 100 + vert;

      curBlock = [];
    }

    this.q13Answer2 = total.toString();
  }

  fixColumnSmudge(block: string[]): number {
    // Assume i is the line to the left of the mirror.
    for (var i = 0; i < block[0].length - 1; i++) {
      let smallestDist =
        i + 1 < block[0].length - 1 - i ? i + 1 : block[0].length - 1 - i;

      if (smallestDist < 1) {
        continue;
      }

      let equalCount = 0;
      let lastLine1 = '';
      let lastLine2 = '';
      for (var j = 0; j < smallestDist; j++) {
        let line1 = '';
        let line2 = '';

        let isEqual = true;
        for (var k = 0; k < block.length; k++) {
          line1 += block[k][i - j];
          line2 += block[k][i + 1 + j];
          if (block[k][i - j] != block[k][i + 1 + j]) {
            isEqual = false;
          }
        }

        if (isEqual) {
          equalCount += 1;
        } else {
          lastLine1 = line1;
          lastLine2 = line2;
        }
      }

      if (equalCount + 1 == smallestDist) {
        if (this.checkForSmudge(lastLine1, lastLine2)) {
          return i + 1;
        }
      }
    }

    return 0;
  }

  fixRowSmudge(block: string[]): number {
    // Assume i is the line to the top of the mirror.
    for (var i = 0; i < block.length - 1; i++) {
      let smallestDist =
        i + 1 < block.length - 1 - i ? i + 1 : block.length - 1 - i;

      if (smallestDist < 1) {
        continue;
      }

      let equalCount = 0;
      let lastDiff = 0;
      for (var j = 0; j < smallestDist; j++) {
        if (block[i - j] == block[i + 1 + j]) {
          equalCount += 1;
        } else {
          lastDiff = j;
        }
      }

      if (equalCount + 1 == smallestDist) {
        if (this.checkForSmudge(block[i - lastDiff], block[i + 1 + lastDiff])) {
          return i + 1;
        }
      }
    }

    return 0;
  }

  checkForSmudge(line1: string, line2: string): boolean {
    let count = 0;
    for (var i = 0; i < line1.length; i++) {
      if (line1[i] == line2[i]) {
        count += 1;
      }
    }

    return line1.length - count == 1;
  }
}
