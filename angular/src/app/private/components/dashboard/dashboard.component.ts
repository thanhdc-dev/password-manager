import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  statistic: any = {};
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dashboardService.index().subscribe(res => {
      this.statistic = res?.data;
    });
  }
}
