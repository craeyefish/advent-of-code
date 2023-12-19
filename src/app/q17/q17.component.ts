import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Move {
  x: number;
  y: number;
  dir: string;
  dirCount: number;
  score: number;
  count: number;
  heatCount: number;
}

@Component({
  selector: 'app-q17',
  templateUrl: './q17.component.html',
  styleUrls: ['./q17.component.css'],
})
export class Q17Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q17();
  }

  q17Answer1: string | undefined;
  q17Answer2: string | undefined;

  q17() {
    this.http
      .get('assets/q17.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a17a(arr);
        this.a17b(arr);
      });
  }

  // 1425 too high
  // 1424 too high
  // 1414 not tested
  // 1410 too high - just input
  // 1409 wrong
  // 1408 wrong
  // 1407 wrong
  // 1406 wrong
  // 1405 wrong
  // 1404 wrong

  // 1402 wrong
  // 1401 wrong
  a17a(arr: string[]): void {
    let total = 100000;
    let moves: Move[] = [];
    let chosenMoves: Move[] = [];
    let chosenChosenMoves: Move[] = [];

    let iter = 0;

    const kTot = 100;

    for (var k = 0; k < kTot; k++) {
      moves = [];
      chosenMoves = [];
      chosenMoves.push({
        x: 0,
        y: 0,
        dir: 'start',
        dirCount: 0,
        score: 0,
        count: 0,
        heatCount: 0,
      });

      while (chosenMoves[chosenMoves.length - 1].dir != 'end') {
        let bestMoves: Move[] = [];
        let bestJump = -1000000000; // small = good
        let multiplier = 1 + Math.round(Math.random() * 5); // was 3
        let multiplier2 = 200 + Math.round(Math.random() * 800); // was 800
        let multiplier3 = 9 + Math.round(Math.random() * 6); // was 12

        for (var i = 0; i < 100000; i++) {
          moves = [];
          moves.push(chosenMoves[chosenMoves.length - 1]);
          let heat = 0;
          for (var j = 0; j < 44; j++) {
            if (moves[moves.length - 1].dir == 'end') {
              continue;
            }
            let m = this.move(arr, moves[moves.length - 1]);
            moves.push(m);
            heat += parseInt(arr[m.y][m.x]);
          }

          let xDif =
            moves[moves.length - 1].x - chosenMoves[chosenMoves.length - 1].x;
          let yDiff =
            moves[moves.length - 1].y - chosenMoves[chosenMoves.length - 1].y;
          let jump = 3 * (xDif + yDiff) - heat;

          if (jump > bestJump) {
            // console.log(
            //   'diff percentag: ' +
            //     (3 * (xDif + yDiff)) / (3 * (xDif + yDiff) + heat)
            // );
            bestJump = jump;
            bestMoves = moves;
          }
        }

        // console.log(bestMoves[bestMoves.length - 1]);
        chosenMoves.push(...bestMoves.slice(1));

        iter += 1;
      }

      chosenMoves.reverse();
      chosenMoves.pop();
      chosenMoves.reverse();

      let subTotal = 0;
      chosenMoves.forEach((m) => {
        subTotal += parseInt(arr[m.y][m.x]);
      });

      if (subTotal < total) {
        total = subTotal;
        console.log('loop: ' + k);
        console.log(chosenMoves);
        console.log(subTotal);
        chosenChosenMoves = [];
        chosenChosenMoves.push(...chosenMoves);
      }

      if (k % 1 == 0) {
        console.log(k + '%');
      }
    }

    chosenChosenMoves.forEach((m) => {
      let line = arr[m.y];
      const cipherChars = [...line];
      cipherChars[m.x] = '*';
      arr[m.y] = cipherChars.join('');
    });

    console.log(arr);
    this.q17Answer1 = total.toString();
  }

  move(block: string[], m: Move): Move {
    let possibileMoves: Move[] = [];
    // console.log(m);

    // up
    if (m.y > 0 && !(m.dir == 'up' && m.dirCount == 3) && m.dir != 'down') {
      possibileMoves.push({
        x: m.x,
        y: m.y - 1,
        dir: 'up',
        dirCount: m.dir == 'up' ? m.dirCount + 1 : 1,
        score: 10 - parseInt(block[m.y - 1][m.x]) - 7,
        count: m.count + 1,
        heatCount: m.heatCount + parseInt(block[m.y - 1][m.x]),
      });
    }

    // down
    if (
      m.y < block.length - 1 &&
      !(m.dir == 'down' && m.dirCount == 3) &&
      m.dir != 'up'
    ) {
      if (m.y + 1 == block.length - 1 && m.x == block[0].length - 1) {
        return {
          x: m.x,
          y: m.y + 1,
          dir: 'end',
          dirCount: 0,
          score: 0,
          count: m.count + 1,
          heatCount: m.heatCount + parseInt(block[m.y + 1][m.x]),
        };
      }

      possibileMoves.push({
        x: m.x,
        y: m.y + 1,
        dir: 'down',
        dirCount: m.dir == 'down' ? m.dirCount + 1 : 1,
        score: 10 - parseInt(block[m.y + 1][m.x]) + 7,
        count: m.count + 1,
        heatCount: m.heatCount + parseInt(block[m.y + 1][m.x]),
      });
    }

    // left
    if (m.x > 0 && !(m.dir == 'left' && m.dirCount == 3) && m.dir != 'right') {
      possibileMoves.push({
        x: m.x - 1,
        y: m.y,
        dir: 'left',
        dirCount: m.dir == 'left' ? m.dirCount + 1 : 1,
        score: 10 - parseInt(block[m.y][m.x - 1]) - 7,
        count: m.count + 1,
        heatCount: m.heatCount + parseInt(block[m.y][m.x - 1]),
      });
    }

    // right
    if (
      m.x < block[0].length - 1 &&
      !(m.dir == 'right' && m.dirCount == 3) &&
      m.dir != 'left'
    ) {
      if (m.y == block.length - 1 && m.x + 1 == block[0].length - 1) {
        return {
          x: m.x + 1,
          y: m.y,
          dir: 'end',
          dirCount: 0,
          score: 0,
          count: m.count + 1,
          heatCount: m.heatCount + parseInt(block[m.y][m.x + 1]),
        };
      }

      possibileMoves.push({
        x: m.x + 1,
        y: m.y,
        dir: 'right',
        dirCount: m.dir == 'right' ? m.dirCount + 1 : 1,
        score: 10 - parseInt(block[m.y][m.x + 1]) + 7,
        count: m.count + 1,
        heatCount: m.heatCount + parseInt(block[m.y][m.x + 1]),
      });
    }

    possibileMoves.sort((m1, m2) => m1.score - m2.score);

    let total = 0;
    possibileMoves.forEach((x) => {
      if (x.score > 0) {
        total += x.score;
      }
    });
    let pick = Math.round(Math.random() * total);
    let count = 0;
    let chosenMove = 0;
    for (var i = 0; i < possibileMoves.length; i++) {
      if (count + possibileMoves[i].score >= pick) {
        chosenMove = i;
        break;
      }
      if (possibileMoves[i].score > 0) {
        count += possibileMoves[i].score;
      }
    }

    // console.log(m);
    // console.log(possibileMoves);
    // console.log(pick);
    // console.log('chosenMove: ' + chosenMove);

    return possibileMoves[chosenMove];
  }

  a17b(arr: string[]): void {
    let total = 0;

    this.q17Answer2 = total.toString();
  }
}
