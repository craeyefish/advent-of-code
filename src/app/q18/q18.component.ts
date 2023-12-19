import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Line {
  start: number;
  stop: number;
  colRow: number;
}

@Component({
  selector: 'app-q18',
  templateUrl: './q18.component.html',
  styleUrls: ['./q18.component.css'],
})
export class Q18Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q18();
  }

  q18Answer1: string | undefined;
  q18Answer2: string | undefined;

  q18() {
    this.http
      .get('assets/q18.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a18a(arr);
        this.a18b(arr);
      });
  }

  a18a(arr: string[]): void {
    let total = 0;
    let maxX = 0;
    let maxY = 0;
    let minX = 0;
    let minY = 0;

    let curX = 0;
    let curY = 0;
    for (var i = 0; i < arr.length; i++) {
      let dir = arr[i].split(' ')[0];
      let dist = parseInt(arr[i].split(' ')[1]);

      if (dir == 'R') {
        curX += dist;
      } else if (dir == 'L') {
        curX -= dist;
      } else if (dir == 'U') {
        curY -= dist;
      } else if (dir == 'D') {
        curY += dist;
      }

      if (curX > maxX) {
        maxX = curX;
      }
      if (curY > maxY) {
        maxY = curY;
      }
      if (curX < minX) {
        minX = curX;
      }
      if (curY < minY) {
        minY = curY;
      }
    }

    let grid: string[] = [];

    for (var i = 0; i < maxY - minY + 1; i++) {
      var line = '';
      for (var j = 0; j < maxX - minX + 1; j++) {
        line += '.';
      }
      grid.push(line);
    }

    curX = -minX;
    curY = -minY;
    for (var i = 0; i < arr.length; i++) {
      let dir = arr[i].split(' ')[0];
      let dist = parseInt(arr[i].split(' ')[1]);

      for (var j = 0; j < dist; j++) {
        let line = grid[curY];
        const cipherChars = [...line];
        cipherChars[curX] = '#';
        grid[curY] = cipherChars.join('');

        if (dir == 'R') {
          curX += 1;
        } else if (dir == 'L') {
          curX -= 1;
        } else if (dir == 'U') {
          curY -= 1;
        } else if (dir == 'D') {
          curY += 1;
        }
      }
    }

    for (var i = 0; i < grid.length; i++) {
      if (grid[i][0] == '.') {
        this.mark(grid, 0, i);
      }
      if (grid[i][grid[0].length - 1] == '.') {
        this.mark(grid, grid[0].length - 1, i);
      }
    }

    for (var i = 0; i < grid[0].length; i++) {
      if (grid[0][i] == '.') {
        this.mark(grid, i, 0);
      }
      if (grid[grid.length - 1][i] == '.') {
        this.mark(grid, i, grid.length - 1);
      }
    }

    let updated = 1;
    while (updated != 0) {
      updated = 0;

      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
          if (grid[i][j] != '0') {
            continue;
          }

          if (i > 0 && grid[i - 1][j] == '.') {
            this.mark(grid, j, i - 1);
            updated += 1;
          }
          if (i < grid.length - 1 && grid[i + 1][j] == '.') {
            this.mark(grid, j, i + 1);
            updated += 1;
          }
          if (j > 0 && grid[i][j - 1] == '.') {
            this.mark(grid, j - 1, i);
            updated += 1;
          }
          if (i < grid[0].length - 1 && grid[i][j + 1] == '.') {
            this.mark(grid, j + 1, i);
            updated += 1;
          }
        }
      }
    }

    let count = 0;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        if (grid[i][j] == '.' || grid[i][j] == '#') {
          count += 1;
        }
      }
    }

    total = count;

    this.q18Answer1 = total.toString();
  }

  mark(grid: string[], x: number, y: number) {
    let line = grid[y];
    const cipherChars = [...line];
    cipherChars[x] = '0';
    grid[y] = cipherChars.join('');
  }

  a18b(arr: string[]): void {
    let total = 0;
    let maxX = 0;
    let maxY = 0;
    let minX = 0;
    let minY = 0;

    let vLines: Line[] = [];
    let vLinesS: Line[] = [];
    let hLines: Line[] = [];

    let curX = 0;
    let curY = 0;
    for (var i = 0; i < arr.length; i++) {
      let str = arr[i].split(' ')[2];
      let dist = Number('0x' + str.substring(2, 7));
      let dir = str.substring(7, 8);

      if (dir == '0') {
        hLines.push({ start: curX, stop: curX + dist, colRow: curY });
        curX += dist;
      } else if (dir == '2') {
        hLines.push({ start: curX - dist, stop: curX, colRow: curY });
        curX -= dist;
      } else if (dir == '3') {
        vLines.push({ start: curY - dist, stop: curY, colRow: curX });
        curY -= dist;
      } else if (dir == '1') {
        vLines.push({ start: curY, stop: curY + dist, colRow: curX });
        curY += dist;
      }

      if (curX > maxX) {
        maxX = curX;
      }
      if (curY > maxY) {
        maxY = curY;
      }
      if (curX < minX) {
        minX = curX;
      }
      if (curY < minY) {
        minY = curY;
      }
    }

    // console.log(maxX);
    // console.log(maxY);

    hLines.sort((l1, l2) => l1.colRow - l2.colRow);
    vLines.sort((l1, l2) => l1.colRow - l2.colRow);

    // Determine which rows to calculate, we are only interested
    // in rows at, on or directly after line starts and ends.
    let rowsToCalc: number[] = [];
    rowsToCalc.push(0);
    rowsToCalc.push(maxY - minY - 1);

    for (var k = 0; k < vLines.length; k++) {
      vLines[k].start -= minY;
      vLines[k].stop -= minY;
      vLines[k].colRow -= minX;
      rowsToCalc.push(vLines[k].start + 1);
      rowsToCalc.push(vLines[k].start);
      rowsToCalc.push(vLines[k].stop);
      rowsToCalc.push(vLines[k].stop - 1);
      if (vLines[k].start > 0) {
        rowsToCalc.push(vLines[k].start - 1);
      }
      if (vLines[k].stop < maxY - minY - 1) {
        rowsToCalc.push(vLines[k].stop + 1);
      }
    }
    for (var k = 0; k < hLines.length; k++) {
      hLines[k].start -= minX;
      hLines[k].stop -= minX;
      hLines[k].colRow -= minY;
      rowsToCalc.push(hLines[k].colRow);
      if (hLines[k].colRow > 0) {
        rowsToCalc.push(hLines[k].colRow - 1);
      }

      if (hLines[k].colRow < maxY - minY - 1) {
        rowsToCalc.push(hLines[k].colRow + 1);
      }
    }

    rowsToCalc.sort((a, b) => a - b);
    rowsToCalc = rowsToCalc.filter(
      (value, index) => rowsToCalc.indexOf(value) === index
    );

    let currentCount = 0;
    let lastRow = -1;

    let colsToCalc: number[] = [];

    // Loop through the important rows and calculate their score (amount of points inside or on lines).
    // Assume the same answer for all co-ordinates between two special rows. Multiply the row value by
    // the number of non-special rows between the special rows. Add upp all of these blocks to get the
    // final answer.
    for (var i = 0; i < rowsToCalc.length; i++) {
      let y = rowsToCalc[i];

      // Determine which x values in each row to calculate, we are only interested
      // in points at, on or directly after line starts and ends.
      colsToCalc = [];
      colsToCalc.push(0);
      colsToCalc.push(maxX - minX - 1);

      for (var k = 0; k < hLines.length; k++) {
        if (hLines[k].colRow == rowsToCalc[i]) {
          colsToCalc.push(hLines[k].start);
          colsToCalc.push(hLines[k].stop);

          if (hLines[k].start > 0) {
            colsToCalc.push(hLines[k].start - 1);
          }

          if (hLines[k].stop < maxX - minX - 1) {
            colsToCalc.push(hLines[k].stop + 1);
          }
        }
      }
      for (var k = 0; k < vLines.length; k++) {
        if (vLines[k].start < rowsToCalc[i] && vLines[k].stop > rowsToCalc[i]) {
          colsToCalc.push(vLines[k].colRow);
          if (vLines[k].colRow > 0) {
            colsToCalc.push(vLines[k].colRow - 1);
          }
          if (vLines[k].colRow < maxX - minX - 1) {
            colsToCalc.push(vLines[k].colRow + 1);
          }
        }
      }
      colsToCalc.sort((a, b) => a - b);
      colsToCalc = colsToCalc.filter(
        (value, index) => colsToCalc.indexOf(value) === index
      );

      let rowCount = 0;
      let lastCol = -1;

      // Loop through the important x values and work out if they are on a line or inside
      // or outside. Assume the same answer for all co-ordinates between two special points.
      // Add up all the values to get the rowCount.
      for (var j = 0; j < colsToCalc.length; j++) {
        let x = colsToCalc[j];

        let onLine = false;
        let vCount = 0;
        let inside = false;

        // Determine if a point is on a vertical line.
        for (var k = 0; k < vLines.length; k++) {
          if (
            vLines[k].colRow == x &&
            vLines[k].start <= y &&
            vLines[k].stop >= y
          ) {
            onLine = true;
            break;
          }
        }

        if (onLine) {
          rowCount += x - lastCol;
          lastCol = x;
          continue;
        }

        // Determine if a point is on a horizontal line.
        for (var k = 0; k < hLines.length; k++) {
          if (
            hLines[k].colRow == y &&
            hLines[k].start <= x &&
            hLines[k].stop >= x
          ) {
            onLine = true;
            break;
          }
        }

        if (onLine) {
          rowCount += x - lastCol;
          lastCol = x;
          continue;
        }

        // Determine if a point is inside according to the vertical lines.
        for (var k = 0; k < vLines.length; k++) {
          if (vLines[k].colRow >= x) {
            break;
          }

          if (vLines[k].start <= y && vLines[k].stop > y) {
            inside = !inside;
            vCount += 1;
          }
        }

        // Don't count point if the vertical lines determine point to be outside.
        if (!inside && vCount != 0) {
          lastCol = x;
          continue;
        }

        // Determine if the point is inside according to the horizontal lines.
        inside = false;
        for (var k = 0; k < hLines.length; k++) {
          if (hLines[k].colRow >= y) {
            break;
          }

          if (hLines[k].start <= x && hLines[k].stop > x) {
            inside = !inside;
          }
        }

        if (inside) {
          rowCount += x - lastCol;
        }
        lastCol = x;
      }

      currentCount += rowCount * (y - lastRow);
      lastRow = y;
    }

    this.q18Answer2 = currentCount.toString();
  }
}
