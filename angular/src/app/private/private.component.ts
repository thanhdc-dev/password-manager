import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  mobileQuery: MediaQueryList = this.media.matchMedia('(min-width: 768px)');

  constructor(private media: MediaMatcher) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
  }
}
