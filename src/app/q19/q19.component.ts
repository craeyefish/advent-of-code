import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}

interface Flow {
  name: string;
  conditions: string[];
}

interface Possibility {
  minX: number;
  maxX: number;
  minM: number;
  maxM: number;
  minA: number;
  maxA: number;
  minS: number;
  maxS: number;

  hist: string[];
}

@Component({
  selector: 'app-q19',
  templateUrl: './q19.component.html',
  styleUrls: ['./q19.component.css'],
})
export class Q19Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q19();
  }

  q19Answer1: string | undefined;
  q19Answer2: string | undefined;

  q19() {
    this.http
      .get('assets/q19.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a19a(arr);
        this.a19b(arr);
      });
  }

  a19a(arr: string[]): void {
    let total = 0;

    let parts: Part[] = [];
    let flows: Flow[] = [];
    let flowMap = new Map<string, Flow>();

    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] == '{') {
        let part: Part = { x: 0, m: 0, a: 0, s: 0 };
        let vals = arr[i].substring(1).split('}')[0].split(',');
        for (var j = 0; j < vals.length; j++) {
          let type = vals[j].split('=')[0];
          let val = parseInt(vals[j].split('=')[1]);

          if (type == 'x') {
            part.x = val;
          } else if (type == 'm') {
            part.m = val;
          } else if (type == 'a') {
            part.a = val;
          } else if (type == 's') {
            part.s = val;
          }
        }
        parts.push(part);
      } else if (arr[i] != '') {
        let name = arr[i].split('{')[0];
        let conditions = arr[i].split('{')[1].split('}')[0].split(',');
        flows.push({ name: name, conditions: conditions });
        flowMap.set(name, { name: name, conditions: conditions });
      }
    }

    for (var i = 0; i < parts.length; i++) {
      let flowName = 'in';

      while (flowName != 'R' && flowName != 'A') {
        flowName = this.process(parts[i], flowMap.get(flowName)!);
      }

      if (flowName == 'A') {
        total += parts[i].x + parts[i].m + parts[i].a + parts[i].s;
      }
    }

    this.q19Answer1 = total.toString();
  }

  process(part: Part, flow: Flow): string {
    for (var i = 0; i < flow.conditions.length; i++) {
      let type = flow.conditions[i][0];
      let operator = flow.conditions[i][1];

      let num = 0;
      let nextFlow = '';
      if (
        flow.conditions[i].includes('>') ||
        flow.conditions[i].includes('<')
      ) {
        num = parseInt(flow.conditions[i].split(':')[0].substring(2));
        nextFlow = flow.conditions[i].split(':')[1];
      } else {
        return flow.conditions[i];
      }

      if (type == 'x') {
        if (operator == '>' && part.x > num) {
          return nextFlow;
        }
        if (operator == '<' && part.x < num) {
          return nextFlow;
        }
      }

      if (type == 'm') {
        if (operator == '>' && part.m > num) {
          return nextFlow;
        }
        if (operator == '<' && part.m < num) {
          return nextFlow;
        }
      }

      if (type == 'a') {
        if (operator == '>' && part.a > num) {
          return nextFlow;
        }
        if (operator == '<' && part.a < num) {
          return nextFlow;
        }
      }

      if (type == 's') {
        if (operator == '>' && part.s > num) {
          return nextFlow;
        }
        if (operator == '<' && part.s < num) {
          return nextFlow;
        }
      }
    }
    return '';
  }

  a19b(arr: string[]): void {
    let total = 0;

    let parts: Part[] = [];
    let flows: Flow[] = [];
    let flowMap = new Map<string, Flow>();

    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] == '{') {
        let part: Part = { x: 0, m: 0, a: 0, s: 0 };
        let vals = arr[i].substring(1).split('}')[0].split(',');
        for (var j = 0; j < vals.length; j++) {
          let type = vals[j].split('=')[0];
          let val = parseInt(vals[j].split('=')[1]);

          if (type == 'x') {
            part.x = val;
          } else if (type == 'm') {
            part.m = val;
          } else if (type == 'a') {
            part.a = val;
          } else if (type == 's') {
            part.s = val;
          }
        }
        parts.push(part);
      } else if (arr[i] != '') {
        let name = arr[i].split('{')[0];
        let conditions = arr[i].split('{')[1].split('}')[0].split(',');
        flows.push({ name: name, conditions: conditions });
        flowMap.set(name, { name: name, conditions: conditions });
      }
    }

    let p: Possibility[] = [];
    p.push({
      minX: 1,
      maxX: 4000,
      minM: 1,
      maxM: 4000,
      minA: 1,
      maxA: 4000,
      minS: 1,
      maxS: 4000,
      hist: ['in'],
    });

    let complete = false;
    let iter = 0;
    while (!complete) {
      let newP: Possibility[] = [];
      p.forEach((pos) => {
        if (
          pos.hist[pos.hist.length - 1] == 'R' ||
          pos.hist[pos.hist.length - 1] == 'A'
        ) {
          newP.push(pos);
          return;
        }
        let next = this.findNext(pos, flowMap);
        newP.push(...next);
      });
      p = newP;
      newP = [];
      iter += 1;

      let countComplete = 0;
      let countBusy = 0;
      p.forEach((pos) => {
        if (
          pos.hist[pos.hist.length - 1] == 'R' ||
          pos.hist[pos.hist.length - 1] == 'A'
        ) {
          countComplete += 1;
        } else {
          countBusy += 1;
        }
      });

      console.log(
        'iter: ' + iter + ' complete: ' + countComplete + ' busy: ' + countBusy
      );

      if (countBusy == 0) {
        complete = true;
      }
    }

    for (var i = 0; i < p.length; i++) {
      if (p[i].hist[p[i].hist.length - 1] == 'A') {
        console.log(p[i]);
        total +=
          (p[i].maxX - p[i].minX + 1) *
          (p[i].maxM - p[i].minM + 1) *
          (p[i].maxA - p[i].minA + 1) *
          (p[i].maxS - p[i].minS + 1);
      }
    }

    console.log(p);

    this.q19Answer2 = total.toString();
  }

  findNext(pos: Possibility, flowMap: Map<string, Flow>): Possibility[] {
    let newPos: Possibility[] = [];
    let conditions = flowMap.get(pos.hist[pos.hist.length - 1])!.conditions;

    let minX = 0;
    let maxX = 0;
    let minM = 0;
    let maxM = 0;
    let minA = 0;
    let maxA = 0;
    let minS = 0;
    let maxS = 0;

    for (var i = 0; i < conditions.length; i++) {
      let type = conditions[i][0];
      let operator = conditions[i][1];

      let tPos: Possibility = {
        minX: minX == 0 ? pos.minX : minX > pos.minX ? minX : pos.minX,
        maxX: maxX == 0 ? pos.maxX : maxX < pos.maxX ? maxX : pos.maxX,
        minM: minM == 0 ? pos.minM : minM > pos.minM ? minM : pos.minM,
        maxM: maxM == 0 ? pos.maxM : maxM < pos.maxM ? maxM : pos.maxM,
        minA: minA == 0 ? pos.minA : minA > pos.minA ? minA : pos.minA,
        maxA: maxA == 0 ? pos.maxA : maxA < pos.maxA ? maxA : pos.maxA,
        minS: minS == 0 ? pos.minS : minS > pos.minS ? minS : pos.minS,
        maxS: maxS == 0 ? pos.maxS : maxS < pos.maxS ? maxS : pos.maxS,
        hist: [],
      };
      pos.hist.forEach((flowName) => {
        tPos.hist.push(flowName);
      });

      let num = 0;
      let nextFlow = '';
      if (conditions[i].includes('>') || conditions[i].includes('<')) {
        num = parseInt(conditions[i].split(':')[0].substring(2));
        nextFlow = conditions[i].split(':')[1];
      } else {
        tPos.hist.push(conditions[i]);
        newPos.push(tPos);
        continue;
      }

      if (type == 'x') {
        if (operator == '>' && pos.maxX > num) {
          tPos.hist.push(nextFlow);
          tPos.minX = num + 1;
          maxX = num;
          newPos.push(tPos);
          continue;
        }
        if (operator == '<' && pos.minX < num) {
          tPos.hist.push(nextFlow);
          tPos.maxX = num - 1;
          minX = num;
          newPos.push(tPos);
          continue;
        }
      }

      if (type == 'm') {
        if (operator == '>' && pos.maxM > num) {
          tPos.hist.push(nextFlow);
          tPos.minM = num + 1;
          maxM = num;
          newPos.push(tPos);
          continue;
        }
        if (operator == '<' && pos.minM < num) {
          tPos.hist.push(nextFlow);
          tPos.maxM = num - 1;
          minM = num;
          newPos.push(tPos);
          continue;
        }
      }

      if (type == 'a') {
        if (operator == '>' && pos.maxA > num) {
          tPos.hist.push(nextFlow);
          tPos.minA = num + 1;
          maxA = num;
          newPos.push(tPos);
          continue;
        }
        if (operator == '<' && pos.minA < num) {
          tPos.hist.push(nextFlow);
          tPos.maxA = num - 1;
          minA = num;
          newPos.push(tPos);
          continue;
        }
      }

      if (type == 's') {
        if (operator == '>' && pos.maxS > num) {
          tPos.hist.push(nextFlow);
          tPos.minS = num + 1;
          maxS = num;
          newPos.push(tPos);
          continue;
        }
        if (operator == '<' && pos.minS < num) {
          tPos.hist.push(nextFlow);
          tPos.maxS = num - 1;
          minS = num;
          newPos.push(tPos);
          continue;
        }
      }
    }

    return newPos;
  }
}
