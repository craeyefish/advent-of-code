import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Lens {
  label: string;
  val: number;
}

@Component({
  selector: 'app-q15',
  templateUrl: './q15.component.html',
  styleUrls: ['./q15.component.css'],
})
export class Q15Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q15();
  }

  q15Answer1: string | undefined;
  q15Answer2: string | undefined;

  q15() {
    this.http
      .get('assets/q15.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a15a(arr);
        this.a15b(arr);
      });
  }

  a15a(arr: string[]): void {
    let total = 0;

    let inputs = arr[0].split(',');

    for (var i = 0; i < inputs.length; i++) {
      let val = 0;
      for (var j = 0; j < inputs[i].length; j++) {
        val += inputs[i][j].charCodeAt(0);
        val = val * 17;
        val = val % 256;
      }
      total += val;
    }

    this.q15Answer1 = total.toString();
  }

  a15b(arr: string[]): void {
    let total = 0;

    let inputs = arr[0].split(',');

    let boxLenses = new Map<number, Lens[]>();

    for (var i = 0; i < inputs.length; i++) {
      let val = 0;

      let boxStr = inputs[i].includes('=')
        ? inputs[i].split('=')[0]
        : inputs[i].split('-')[0];
      let boxNum = 0;
      // console.log(boxStr);
      for (var j = 0; j < boxStr.length; j++) {
        boxNum += boxStr[j].charCodeAt(0);
        boxNum = boxNum * 17;
        boxNum = boxNum % 256;
      }
      // console.log(boxNum);

      // total += val;

      let inputLens = inputs[i].includes('=')
        ? parseInt(inputs[i].split('=')[1])
        : parseInt(inputs[i].split('-')[1]);
      // console.log('InputLens: ' + inputLens);
      let lenses = boxLenses.get(boxNum);

      if (inputs[i].includes('-') && lenses != undefined) {
        // console.log('- found');
        let index = -1;
        for (var j = 0; j < lenses.length; j++) {
          // console.log(lenses[j]);
          if (lenses[j].label == boxStr) {
            index = j;
          }
        }

        if (index != -1) {
          // console.log('removing ' + index + ' ' + boxStr + ' from ' + boxNum);
          lenses.splice(index, 1);
        }

        boxLenses.set(boxNum, lenses);
      }

      if (inputs[i].includes('=')) {
        // console.log('= found');
        if (lenses == undefined) {
          // console.log('adding first item to box: ' + boxStr + ' ' + inputLens);
          boxLenses.set(boxNum, [{ label: boxStr, val: inputLens }]);
        } else {
          let found = false;
          for (var j = 0; j < lenses.length; j++) {
            if (lenses[j].label == boxStr) {
              found = true;
              lenses[j].val = inputLens;
            }
          }
          if (!found) {
            // console.log(lenses);
            // console.log('pushing lens');
            lenses.push({ label: boxStr, val: inputLens });
            // console.log(lenses);
          }
        }
      }

      // console.log(boxLenses);
    }

    boxLenses.forEach((val, key) => {
      for (var j = 0; j < val.length; j++) {
        let c = (key + 1) * (j + 1) * val[j].val;
        total += c;
      }
    });

    this.q15Answer2 = total.toString();
  }
}
