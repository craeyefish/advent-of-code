import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-q6',
  templateUrl: './q6.component.html',
  styleUrls: ['./q6.component.css'],
})
export class Q6Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q6();
  }

  q6Answer1: string | undefined;
  q6Answer2: string | undefined;
  q6Time = '???';

  q6() {
    this.http
      .get('assets/q6.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a6a(arr);
        this.a6b(arr);
      });
  }

  a6a(arr: string[]): void {
    let total: number = 0;

    let times = arr[0].split(':')[1].trim().split(' ');
    let distances = arr[1].split(':')[1].trim().split(' ');

    for (var i = 0; i < times.length; i++) {
      if (times[i] == '') {
        continue;
      }
      let time = parseInt(times[i]);

      let dist = parseInt(distances[i]);

      // total dist = time racing * time waiting
      // total time = time racing + time waiting
      // total time = x + y

      let count = 0;
      for (var x = 0; x < time; x++) {
        let y = time - x;
        let ans = x * y;
        if (ans > dist) {
          count += 1;
        }
      }

      if (total == 0) {
        total += count;
        continue;
      }

      total = total * count;
      console.log(count);
    }

    this.q6Answer1 = total.toString();
  }

  a6b(arr: string[]): void {
    let total: number = 0;

    this.q6Answer2 = total.toString();
  }
}
