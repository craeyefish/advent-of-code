import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Rank {
  cards: string;
  score: number;
  val: number;
}

@Component({
  selector: 'app-q7',
  templateUrl: './q7.component.html',
  styleUrls: ['./q7.component.css'],
})
export class Q7Component implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.q7();
  }

  q7Answer1: string | undefined;
  q7Answer2: string | undefined;

  q7() {
    this.http
      .get('assets/q7.txt', { responseType: 'text' })
      .subscribe((data) => {
        var arr = data.split(/\r?\n/);
        this.a7a(arr);
        this.a7b(arr);
      });
  }

  a7a(arr: string[]): void {
    let total: number = 0;

    let ranks: Rank[] = [];

    for (var i = 0; i < arr.length; i++) {
      let rank = {} as Rank;
      let cards = arr[i].trim().split(' ')[0];
      let val = parseInt(arr[i].trim().split(' ')[1]);
      let cardMap = new Map<string, number>();

      rank.cards = cards;
      rank.val = val;

      for (var j = 0; j < cards.length; j++) {
        let cur = cardMap.get(cards[j]);

        if (cur == undefined) {
          cur = 1;
        } else {
          cur += 1;
        }

        cardMap.set(cards[j], cur);
      }

      let hasFiveOfAKind: boolean = false;
      let hasFourOfAKind: boolean = false;
      let hasFullHouse: boolean = false;
      let hasThreeOfAKind: boolean = false;
      let hasTwoPair: boolean = false;
      let hasPair: boolean = false;

      cardMap.forEach((mapping) => {
        if (mapping == 5) {
          hasFiveOfAKind = true;
          return;
        }

        if (mapping == 4) {
          hasFourOfAKind = true;
          return;
        }

        if (mapping == 3) {
          if (hasPair == true) {
            hasFullHouse = true;
            return;
          }

          hasThreeOfAKind = true;
          return;
        }

        if (mapping == 2) {
          if (hasThreeOfAKind == true) {
            hasFullHouse = true;
            return;
          }

          if (hasPair == true) {
            hasTwoPair = true;
            return;
          }

          hasPair = true;
          return;
        }
      });

      if (hasFiveOfAKind) {
        rank.score = 6;
      } else if (hasFourOfAKind) {
        rank.score = 5;
      } else if (hasFullHouse) {
        rank.score = 4;
      } else if (hasThreeOfAKind) {
        rank.score = 3;
      } else if (hasTwoPair) {
        rank.score = 2;
      } else if (hasPair) {
        rank.score = 1;
      } else {
        rank.score = 0;
      }

      ranks.push(rank);
    }

    ranks.sort((a, b) => this.cmp(a, b));

    for (var i = 0; i < arr.length; i++) {
      total += ranks[i].val * (arr.length - i);
    }

    this.q7Answer1 = total.toString();
  }

  cmp(r1: Rank, r2: Rank): number {
    if (r1.score > r2.score) {
      return -1;
    }
    if (r1.score < r2.score) {
      return 1;
    }

    let h1 = r1.cards;
    let h2 = r2.cards;
    console.log('comparing: ' + r1.cards + ' to ' + r2.cards);
    for (let i = 0; i < h1.length; i++) {
      let val1 = parseInt(h1[i]);
      if (val1 == undefined || Number.isNaN(val1)) {
        if (h1[i] == 'T') {
          val1 = 10;
        } else if (h1[i] == 'J') {
          val1 = 11;
        } else if (h1[i] == 'Q') {
          val1 = 12;
        } else if (h1[i] == 'K') {
          val1 = 13;
        } else if (h1[i] == 'A') {
          val1 = 14;
        }
      }

      let val2 = parseInt(h2[i]);
      if (val2 == undefined || Number.isNaN(val2)) {
        if (h2[i] == 'T') {
          val2 = 10;
        } else if (h2[i] == 'J') {
          val2 = 11;
        } else if (h2[i] == 'Q') {
          val2 = 12;
        } else if (h2[i] == 'K') {
          val2 = 13;
        } else if (h2[i] == 'A') {
          val2 = 14;
        }
      }

      if (val1 > val2) {
        return -1;
      }

      if (val1 < val2) {
        return 1;
      }
    }
    return 0;
  }

  a7b(arr: string[]): void {
    let total: number = 0;
    let ranks: Rank[] = [];

    for (var i = 0; i < arr.length; i++) {
      let rank = {} as Rank;
      let cards = arr[i].trim().split(' ')[0];
      let val = parseInt(arr[i].trim().split(' ')[1]);
      let cardMap = new Map<string, number>();
      let jokers: number = 0;

      rank.cards = cards;
      rank.val = val;

      for (var j = 0; j < cards.length; j++) {
        let cur = cardMap.get(cards[j]);

        if (cur == undefined) {
          cur = 1;
        } else {
          cur += 1;
        }

        cardMap.set(cards[j], cur);
      }

      let hasFiveOfAKind: boolean = false;
      let hasFourOfAKind: boolean = false;
      let hasFullHouse: boolean = false;
      let hasThreeOfAKind: boolean = false;
      let hasTwoPair: boolean = false;
      let hasPair: boolean = false;

      cardMap.forEach((mapping, key) => {
        if (key == 'J') {
          console.log('jokers: ' + mapping);
          jokers = mapping;
          return;
        }

        if (mapping == 5) {
          hasFiveOfAKind = true;
          return;
        }

        if (mapping == 4) {
          hasFourOfAKind = true;
          return;
        }

        if (mapping == 3) {
          if (hasPair == true) {
            hasFullHouse = true;
            return;
          }

          hasThreeOfAKind = true;
          return;
        }

        if (mapping == 2) {
          if (hasThreeOfAKind == true) {
            hasFullHouse = true;
            return;
          }

          if (hasPair == true) {
            hasTwoPair = true;
            return;
          }

          hasPair = true;
          return;
        }
      });

      if (hasFiveOfAKind) {
        rank.score = 6;
      } else if (hasFourOfAKind) {
        if (jokers == 1) {
          rank.score = 6;
        } else {
          rank.score = 5;
        }
      } else if (hasFullHouse) {
        rank.score = 4;
      } else if (hasThreeOfAKind) {
        if (jokers == 1) {
          rank.score = 5;
        } else if (jokers == 2) {
          rank.score = 6;
        } else {
          rank.score = 3;
        }
      } else if (hasTwoPair) {
        if (jokers == 1) {
          rank.score = 4;
        } else {
          rank.score = 2;
        }
      } else if (hasPair) {
        if (jokers == 1) {
          rank.score = 3;
        } else if (jokers == 2) {
          rank.score = 5;
        } else if (jokers == 3) {
          rank.score = 6;
        } else {
          rank.score = 1;
        }
      } else {
        if (jokers == 1) {
          rank.score = 1;
        } else if (jokers == 2) {
          rank.score = 3;
        } else if (jokers == 3) {
          rank.score = 5;
        } else if (jokers == 4) {
          rank.score = 6;
        } else if (jokers == 5) {
          rank.score = 6;
        } else {
          rank.score = 0;
        }
      }

      ranks.push(rank);
    }

    ranks.sort((a, b) => this.cmp2(a, b));

    for (var i = 0; i < arr.length; i++) {
      total += ranks[i].val * (arr.length - i);
    }

    this.q7Answer2 = total.toString();
  }

  cmp2(r1: Rank, r2: Rank): number {
    if (r1.score > r2.score) {
      return -1;
    }
    if (r1.score < r2.score) {
      return 1;
    }

    let h1 = r1.cards;
    let h2 = r2.cards;
    for (let i = 0; i < h1.length; i++) {
      let val1 = parseInt(h1[i]);
      if (val1 == undefined || Number.isNaN(val1)) {
        if (h1[i] == 'T') {
          val1 = 10;
        } else if (h1[i] == 'J') {
          val1 = 1;
        } else if (h1[i] == 'Q') {
          val1 = 12;
        } else if (h1[i] == 'K') {
          val1 = 13;
        } else if (h1[i] == 'A') {
          val1 = 14;
        }
      }

      let val2 = parseInt(h2[i]);
      if (val2 == undefined || Number.isNaN(val2)) {
        if (h2[i] == 'T') {
          val2 = 10;
        } else if (h2[i] == 'J') {
          val2 = 1;
        } else if (h2[i] == 'Q') {
          val2 = 12;
        } else if (h2[i] == 'K') {
          val2 = 13;
        } else if (h2[i] == 'A') {
          val2 = 14;
        }
      }

      if (val1 > val2) {
        return -1;
      }

      if (val1 < val2) {
        return 1;
      }
    }
    return 0;
  }
}
