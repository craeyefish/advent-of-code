import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Movement {
  pos: number[];
  dir: string;
}

@Component({
  selector: 'app-q16',
  templateUrl: './q16.component.html',
  styleUrls: ['./q16.component.css'],
})
export class Q16Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q16();
  }

  q16Answer1: string | undefined;
  q16Answer2: string | undefined;
  prevMoves = new Map<string, boolean>();
  prevBlocks = new Map<string, boolean>();

  q16() {
    this.http
      .get('assets/q16.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a16a(arr);
        this.a16b(arr);
      });
  }

  a16a(arr: string[]): void {
    let total = 0;

    let moves: Movement[] = [{ dir: 'right', pos: [0, 0] }];

    let count = 0;
    while (moves.length != 0) {
      let newMoves: Movement[] = [];

      moves.forEach((x) => {
        newMoves.push(...this.move(arr, x));
        this.prevMoves.set(x.dir + '-' + x.pos[0] + '-' + x.pos[1], true);

        if (this.prevBlocks.get(x.pos[0] + '-' + x.pos[1]) != true) {
          this.prevBlocks.set(x.pos[0] + '-' + x.pos[1], true);
        }
      });

      moves = newMoves;
      count += 1;
    }

    this.prevBlocks.forEach((v, k) => {
      total += 1;
    });

    this.q16Answer1 = total.toString();
  }

  move(board: string[], input: Movement): Movement[] {
    let ans: Movement[] = [];
    let cur = board[input.pos[1]][input.pos[0]];

    let prev = this.prevMoves.get(
      input.dir + '-' + input.pos[0] + '-' + input.pos[1]
    );

    if (prev == true) {
      return ans;
    }

    if (input.dir == 'right') {
      if (cur == '.' && input.pos[0] < board[0].length - 1) {
        return [{ pos: [input.pos[0] + 1, input.pos[1]], dir: 'right' }];
      } else if (cur == '/' && input.pos[1] > 0) {
        return [{ pos: [input.pos[0], input.pos[1] - 1], dir: 'up' }];
      } else if (cur == '\\' && input.pos[1] < board.length - 1) {
        return [{ pos: [input.pos[0], input.pos[1] + 1], dir: 'down' }];
      } else if (cur == '-' && input.pos[0] < board[0].length - 1) {
        return [{ pos: [input.pos[0] + 1, input.pos[1]], dir: 'right' }];
      } else if (cur == '|') {
        if (input.pos[1] > 0) {
          ans.push({ pos: [input.pos[0], input.pos[1] - 1], dir: 'up' });
        }
        if (input.pos[1] < board.length - 1) {
          ans.push({ pos: [input.pos[0], input.pos[1] + 1], dir: 'down' });
        }
        return ans;
      } else {
        return ans;
      }
    }

    if (input.dir == 'left') {
      if (cur == '.' && input.pos[0] > 0) {
        return [{ pos: [input.pos[0] - 1, input.pos[1]], dir: 'left' }];
      } else if (cur == '\\' && input.pos[1] > 0) {
        return [{ pos: [input.pos[0], input.pos[1] - 1], dir: 'up' }];
      } else if (cur == '/' && input.pos[1] < board.length - 1) {
        return [{ pos: [input.pos[0], input.pos[1] + 1], dir: 'down' }];
      } else if (cur == '-' && input.pos[0] > 0) {
        return [{ pos: [input.pos[0] - 1, input.pos[1]], dir: 'left' }];
      } else if (cur == '|') {
        if (input.pos[1] > 0) {
          ans.push({ pos: [input.pos[0], input.pos[1] - 1], dir: 'up' });
        }
        if (input.pos[1] < board.length - 1) {
          ans.push({ pos: [input.pos[0], input.pos[1] + 1], dir: 'down' });
        }
        return ans;
      } else {
        return ans;
      }
    }

    if (input.dir == 'up') {
      if (cur == '.' && input.pos[1] > 0) {
        return [{ pos: [input.pos[0], input.pos[1] - 1], dir: 'up' }];
      } else if (cur == '\\' && input.pos[0] > 0) {
        return [{ pos: [input.pos[0] - 1, input.pos[1]], dir: 'left' }];
      } else if (cur == '/' && input.pos[0] < board[0].length - 1) {
        return [{ pos: [input.pos[0] + 1, input.pos[1]], dir: 'right' }];
      } else if (cur == '-') {
        if (input.pos[0] > 0) {
          ans.push({ pos: [input.pos[0] - 1, input.pos[1]], dir: 'left' });
        }
        if (input.pos[0] < board[0].length - 1) {
          ans.push({ pos: [input.pos[0] + 1, input.pos[1]], dir: 'right' });
        }
        return ans;
      } else if (cur == '|' && input.pos[1] > 0) {
        return [{ pos: [input.pos[0], input.pos[1] - 1], dir: 'up' }];
      } else {
        return ans;
      }
    }

    if (input.dir == 'down') {
      if (cur == '.' && input.pos[1] < board.length - 1) {
        return [{ pos: [input.pos[0], input.pos[1] + 1], dir: 'down' }];
      } else if (cur == '/' && input.pos[0] > 0) {
        return [{ pos: [input.pos[0] - 1, input.pos[1]], dir: 'left' }];
      } else if (cur == '\\' && input.pos[0] < board[0].length - 1) {
        return [{ pos: [input.pos[0] + 1, input.pos[1]], dir: 'right' }];
      } else if (cur == '-') {
        if (input.pos[0] > 0) {
          ans.push({ pos: [input.pos[0] - 1, input.pos[1]], dir: 'left' });
        }
        if (input.pos[0] < board[0].length - 1) {
          ans.push({ pos: [input.pos[0] + 1, input.pos[1]], dir: 'right' });
        }
        return ans;
      } else if (cur == '|' && input.pos[1] < board.length - 1) {
        return [{ pos: [input.pos[0], input.pos[1] + 1], dir: 'down' }];
      } else {
        return ans;
      }
    }

    return ans;
  }

  // 7581
  // 7714
  // 7741
  // 7514
  a16b(arr: string[]): void {
    let largest = 0;

    for (var i = 0; i < arr[0].length; i++) {
      // update to find all vals
      let moves: Movement[] = [{ dir: 'left', pos: [arr[0].length - 1, i] }];
      this.prevMoves.clear();
      this.prevBlocks.clear();

      while (moves.length != 0) {
        let newMoves: Movement[] = [];

        moves.forEach((x) => {
          newMoves.push(...this.move(arr, x));
          this.prevMoves.set(x.dir + '-' + x.pos[0] + '-' + x.pos[1], true);

          if (this.prevBlocks.get(x.pos[0] + '-' + x.pos[1]) != true) {
            this.prevBlocks.set(x.pos[0] + '-' + x.pos[1], true);
          }
        });

        moves = newMoves;
      }

      let count = 0;
      this.prevBlocks.forEach((v, k) => {
        count += 1;
      });

      if (count > largest) {
        largest = count;
      }
    }

    this.q16Answer2 = largest.toString();
  }
}
