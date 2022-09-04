import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

interface MenuItem {
  title: string;
  path: string;
  iconClass: string;
}

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  menuItems: MenuItem[] = [];
  user: any = {};
  mobileQuery: MediaQueryList = this.media.matchMedia('(min-width: 768px)');

  constructor(private authService: AuthService, private media: MediaMatcher) { }

  ngOnInit(): void {
    this.init();
    this.getUser();
  }

  init() {
    this.menuItems = [
      {
        title: 'Dashboard',
        path: '/dashboard',
        iconClass: 'fas fa-tv'
      }
    ]
  }

  getUser() {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout().subscribe(isSuccess => {
      if (isSuccess) {
        console.log('Logout');
      }
    })
  }
}
