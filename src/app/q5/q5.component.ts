import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-q5',
  templateUrl: './q5.component.html',
  styleUrls: ['./q5.component.css'],
})
export class Q5Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q5();
  }

  q5Answer1: string | undefined;
  q5Answer2: string | undefined;
  q5Time = '???';

  q5() {
    this.http
      .get('assets/q5.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a5a(arr);
        this.a5b(arr);
      });
  }

  a5a(arr: string[]): void {
    let mapType: string = '';
    let seedToSoil: number[][] = [];
    let soilToFertilizer: number[][] = [];
    let fertilizerToWater: number[][] = [];
    let waterToLight: number[][] = [];
    let lightToTemp: number[][] = [];
    let tempToHumidity: number[][] = [];
    let humidityToLocation: number[][] = [];

    let myMap = new Map<string, number[][]>([
      ['seed-to-soil', seedToSoil],
      ['soil-to-fertilizer', soilToFertilizer],
      ['fertilizer-to-water', fertilizerToWater],
      ['water-to-light', waterToLight],
      ['light-to-temperature', lightToTemp],
      ['temperature-to-humidity', tempToHumidity],
      ['humidity-to-location', humidityToLocation],
    ]);

    // get seeds
    let seeds = arr[0].split(':')[1].trim().split(' ');

    // make maps
    for (var i = 2; i < arr.length; i++) {
      if (arr[i].includes('map')) {
        mapType = arr[i].split(' ')[0];
        continue;
      }

      if (arr[i] == '') {
        continue;
      }

      let nums: number[] = [];
      arr[i]
        .trim()
        .split(' ')
        .forEach((x) => {
          nums.push(parseInt(x));
        });

      let curArr = myMap.get(mapType);
      curArr?.push(nums);
    }

    let answers: number[] = [];
    seeds.forEach((x) => {
      let val: number = parseInt(x);
      val = this.transform(val, seedToSoil);
      val = this.transform(val, soilToFertilizer);
      val = this.transform(val, fertilizerToWater);
      val = this.transform(val, waterToLight);
      val = this.transform(val, lightToTemp);
      val = this.transform(val, tempToHumidity);
      val = this.transform(val, humidityToLocation);

      answers.push(val);
    });

    answers.sort((n1, n2) => n1 - n2);
    this.q5Answer1 = answers[0].toString();
  }

  transform(num: number, arr: number[][]): number {
    let convertedNum = num;

    arr.forEach((mapping) => {
      let dest: number = mapping[0];
      let source: number = mapping[1];
      let len: number = mapping[2];
      if (num < source || num >= source + len) {
        return;
      }

      convertedNum = num + dest - source;
    });

    return convertedNum;
  }

  a5b(arr: string[]): void {
    let mapType: string = '';
    let seedToSoil: number[][] = [];
    let soilToFertilizer: number[][] = [];
    let fertilizerToWater: number[][] = [];
    let waterToLight: number[][] = [];
    let lightToTemp: number[][] = [];
    let tempToHumidity: number[][] = [];
    let humidityToLocation: number[][] = [];

    let myMap = new Map<string, number[][]>([
      ['seed-to-soil', seedToSoil],
      ['soil-to-fertilizer', soilToFertilizer],
      ['fertilizer-to-water', fertilizerToWater],
      ['water-to-light', waterToLight],
      ['light-to-temperature', lightToTemp],
      ['temperature-to-humidity', tempToHumidity],
      ['humidity-to-location', humidityToLocation],
    ]);

    // make maps
    for (var i = 2; i < arr.length; i++) {
      if (arr[i].includes('map')) {
        mapType = arr[i].split(' ')[0];
        continue;
      }

      if (arr[i] == '') {
        continue;
      }

      let nums: number[] = [];
      arr[i]
        .trim()
        .split(' ')
        .forEach((x) => {
          nums.push(parseInt(x));
        });

      let curArr = myMap.get(mapType);
      curArr?.push(nums);
    }

    // get seeds
    let seedVals = arr[0].split(':')[1].trim().split(' ');
    let answer: number = 99999999999999999;

    for (var i = 0; i < seedVals.length; i += 2) {
      console.log('next seed: ' + (i / 2 + 1));
      for (var j = 0; j < parseInt(seedVals[i + 1]); j++) {
        let val: number = parseInt(seedVals[i]) + j;
        val = this.transform2(val, seedToSoil);
        val = this.transform2(val, soilToFertilizer);
        val = this.transform2(val, fertilizerToWater);
        val = this.transform2(val, waterToLight);
        val = this.transform2(val, lightToTemp);
        val = this.transform2(val, tempToHumidity);
        val = this.transform2(val, humidityToLocation);

        if (val < answer) {
          answer = val;
          console.log('new lowest answer: ' + answer);
        }

        if (j % 10000000 == 0) {
          console.log(j);
        }
      }
    }

    this.q5Answer2 = answer.toString();
  }

  transform2(num: number, arr: number[][]): number {
    let convertedNum = num;

    arr.forEach((mapping) => {
      let dest: number = mapping[0];
      let source: number = mapping[1];
      let len: number = mapping[2];
      if (num < source || num >= source + len) {
        return;
      }

      convertedNum = num + dest - source;
    });

    return convertedNum;
  }
}
