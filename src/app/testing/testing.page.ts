import { Component, OnInit } from '@angular/core';
import { of, fromEvent } from 'rxjs';
import { concatMap, delay, mergeMap, auditTime, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
  clicks = 0;
  totalClicks = 0;
  constructor() { }

  ngOnInit() {
    // this.source.pipe(
    //   mergeMap(value => of(`Delayed by: ${value}ms`).pipe(delay(value)))
    // ).subscribe(value => console.log(`With concatMap: ${value}`));

    fromEvent(document, 'click').pipe(
      map(_ => this.clicks++),
      debounceTime(1000)
    ).subscribe(_ => {
      this.totalClicks += this.clicks;
      this.clicks = 0;
    });
  }

}
