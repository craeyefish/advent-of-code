import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q10',
  templateUrl: './q10.component.html',
  styleUrls: ['./q10.component.css'],
})
export class Q10Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q10();
  }

  q10Answer1: string | undefined;
  q10Answer2: string | undefined;

  q10() {
    this.http
      .get('assets/q10.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a10a(arr);
        this.a10b(arr);
      });
  }

  a10a(arr: string[]): void {
    let total = 0;

    let startX = -1;
    let startY = -1;

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == 'S') {
          startX = j;
          startY = i;
        }
      }
    }

    let count = 1;
    let prev = [
      [startX, startY],
      [startX, startY],
    ];
    let paths = this.findNext(arr, startX, startY);

    while (paths[0][0] != paths[1][0] || paths[0][1] != paths[1][1]) {
      let opts1 = this.findNext(arr, paths[0][0], paths[0][1]);
      let chosen1 = false;
      opts1.forEach((opt) => {
        if (chosen1) {
          return;
        }

        if (opt[0] == prev[0][0] && opt[1] == prev[0][1]) {
          return;
        }

        prev[0] = paths[0];
        paths[0] = opt;
        chosen1 = true;
      });

      let opts2 = this.findNext(arr, paths[1][0], paths[1][1]);
      let chosen2 = false;
      opts2.forEach((opt) => {
        if (chosen2) {
          return;
        }

        if (opt[0] == prev[1][0] && opt[1] == prev[1][1]) {
          return;
        }

        prev[1] = paths[1];
        paths[1] = opt;
        chosen2 = true;
      });

      count += 1;
    }

    this.q10Answer1 = count.toString();
  }

  valid = new Map<string, string>([
    ['|', 'UD'],
    ['-', 'LR'],
    ['L', 'UR'],
    ['J', 'UL'],
    ['7', 'LD'],
    ['F', 'RD'],
  ]);

  findNext(grid: string[], x: number, y: number): number[][] {
    let possible: number[][] = [];

    let dirs = this.valid.get(grid[y][x]);
    let isStart = grid[y][x] == 'S';

    // left
    if (x != 0 && (dirs?.includes('L') || isStart)) {
      let dirsL = this.valid.get(grid[y][x - 1]);
      if (dirsL?.includes('R')) {
        possible.push([x - 1, y]);
      }
    }

    // right
    if (x < grid[0].length && (dirs?.includes('R') || isStart)) {
      let dirsR = this.valid.get(grid[y][x + 1]);
      if (dirsR?.includes('L')) {
        possible.push([x + 1, y]);
      }
    }

    // up
    if (y != 0 && (dirs?.includes('U') || isStart)) {
      let dirsU = this.valid.get(grid[y - 1][x]);
      if (dirsU?.includes('D')) {
        possible.push([x, y - 1]);
      }
    }

    //down
    if (y < grid.length && (dirs?.includes('D') || isStart)) {
      let dirsD = this.valid.get(grid[y + 1][x]);
      if (dirsD?.includes('U')) {
        possible.push([x, y + 1]);
      }
    }

    return possible;
  }

  a10b(arr: string[]): void {
    let total = 0;

    let startX = -1;
    let startY = -1;

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == 'S') {
          startX = j;
          startY = i;
        }
      }
    }

    let count = 1;
    let prev = [
      [startX, startY],
      [startX, startY],
    ];
    let paths = this.findNext(arr, startX, startY);
    let fullPaths: number[][] = [];
    fullPaths.push([startX, startY]);
    fullPaths.push(paths[0]);
    fullPaths.push(paths[1]);

    while (paths[0][0] != paths[1][0] || paths[0][1] != paths[1][1]) {
      let opts1 = this.findNext(arr, paths[0][0], paths[0][1]);
      fullPaths.push(opts1[0]);

      let chosen1 = false;
      opts1.forEach((opt) => {
        if (chosen1) {
          return;
        }

        if (opt[0] == prev[0][0] && opt[1] == prev[0][1]) {
          return;
        }

        prev[0] = paths[0];
        paths[0] = opt;
        chosen1 = true;
      });

      let opts2 = this.findNext(arr, paths[1][0], paths[1][1]);
      fullPaths.push(opts2[0]);

      let chosen2 = false;
      opts2.forEach((opt) => {
        if (chosen2) {
          return;
        }

        if (opt[0] == prev[1][0] && opt[1] == prev[1][1]) {
          return;
        }

        prev[1] = paths[1];
        paths[1] = opt;

        chosen2 = true;
      });

      fullPaths.push(paths[0]);
      fullPaths.push(paths[1]);
      let line = arr[i];
      count += 1;
    }

    let line = arr[startY];
    const cipherChars = [...line];
    cipherChars[startX] = '7';
    arr[startY] = cipherChars.join('');

    let insideCount = 0;

    for (var i = 0; i < arr.length; i++) {
      let isInside = false;
      let start = '';

      for (var j = 0; j < arr[i].length; j++) {
        if (fullPaths.some((x) => x[0] == j && x[1] == i)) {
          if (arr[i][j] == 'F' || arr[i][j] == 'L') {
            start = arr[i][j];
          }

          if (arr[i][j] == '|') {
            isInside = !isInside;
          }

          if (arr[i][j] == 'J') {
            if (start == 'F') {
              isInside = !isInside;
            }
            start = '';
          }

          if (arr[i][j] == '7') {
            if (start == 'L') {
              isInside = !isInside;
            }
            start = '';
          }
        } else {
          if (isInside) {
            let line = arr[i];
            const cipherChars = [...line];
            cipherChars[j] = '*';
            arr[i] = cipherChars.join('');
            insideCount += 1;
          }
        }
      }
    }

    this.q10Answer2 = insideCount.toString();
  }
}
