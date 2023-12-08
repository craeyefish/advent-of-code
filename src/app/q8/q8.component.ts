import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Portal {
  dest: string;
  count: number;
}

@Component({
  selector: 'app-q8',
  templateUrl: './q8.component.html',
  styleUrls: ['./q8.component.css'],
})
export class Q8Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q8();
  }

  q8Answer1: string | undefined;
  q8Answer2: string | undefined;

  q8() {
    this.http
      .get('assets/q8.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a8a(arr);
        this.a8b(arr);
      });
  }

  a8a(arr: string[]): void {
    let fromTo = new Map<string, string[]>();
    let fromToPortal = new Map<string, Portal>();

    let instructions = arr[0];

    let cur = 'AAA';

    for (var i = 2; i < arr.length; i++) {
      let from = arr[i].split(' ')[0];
      let to = arr[i]
        .split('=')[1]
        .trim()
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .split(',');

      fromTo.set(from, to);
    }

    fromTo.forEach((to, from) => {
      let count = 0;
      let cur = from;

      while (count < instructions.length && cur != 'ZZZ') {
        let instr = instructions[count];

        if (instr == 'L') {
          cur = fromTo.get(cur)![0];
        } else {
          cur = fromTo.get(cur)![1];
        }

        count += 1;
      }

      let p = {} as Portal;
      p.dest = cur;
      p.count = count;

      fromToPortal.set(from, p);
    });

    let count = 0;
    let itrCount = 0;

    while (cur != 'ZZZ') {
      let n = fromToPortal.get(cur);

      cur = n!.dest;
      count += n!.count;
      itrCount += 1;
    }

    this.q8Answer1 = count.toString();
  }

  a8b(arr: string[]): void {
    let total: number = 0;

    let fromTo = new Map<string, string[]>();
    let fromToPortal = new Map<string, Portal>();

    let instructions = arr[0];

    let starts: string[] = [];
    let counts: number[] = [];

    for (var i = 2; i < arr.length; i++) {
      let from = arr[i].split(' ')[0];
      let to = arr[i]
        .split('=')[1]
        .trim()
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .split(',');

      fromTo.set(from, to);
    }

    fromTo.forEach((to, from) => {
      let count = 0;
      let cur = from;

      if (from[2] == 'A') {
        starts.push(from);
        counts.push(0);
      }
    });

    console.log(starts);

    let itrCount = 0;
    let allEqual = false;
    let zHits: number[] = [];

    while (allEqual == false && itrCount < 100000) {
      let instr = instructions[itrCount % instructions.length];

      allEqual = true;

      for (var i = 0; i < starts.length; i++) {
        if (instr == 'L') {
          starts[i] = fromTo.get(starts[i])![0];
        } else {
          starts[i] = fromTo.get(starts[i])![1];
        }

        if (starts[i][2] != 'Z') {
          allEqual = false;
        }
      }

      itrCount += 1;

      // Calculate the loop distances by logging every z hit. Manually changed
      // the values here to get the numbers required for the next part.
      if (starts[5][2] == 'Z') {
        zHits.push(itrCount);
        console.log(starts[5] + ' : ' + itrCount);
      }
    }

    // Print out differences.
    for (var i = 0; i < zHits.length - 1; i++) {
      console.log(
        zHits[i + 1] + ' - ' + zHits[i] + '= ' + (zHits[i + 1] - zHits[i])
      );
    }

    allEqual = false;
    itrCount = 0;
    let testNum = 21883;
    while (allEqual == false) {
      testNum += 21883;

      if (
        testNum % 13019 == 0 &&
        testNum % 19667 == 0 &&
        testNum % 16343 == 0 &&
        testNum % 18559 == 0 &&
        testNum % 14681 == 0
      ) {
        allEqual = true;
      }

      itrCount += 1;
    }

    this.q8Answer2 = testNum.toString();
  }
}
