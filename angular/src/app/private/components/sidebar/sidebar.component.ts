import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
interface MenuItem {
  name: string;
  path: string;
  iconClass: string;
  icon: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
    './sidebar.component.scss'
  ]
})

export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.menuItems = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        iconClass: 'fas fa-tv',
        icon: 'av_timer',
      }
    ]
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
