import { Component } from '@angular/core';
import DashAnalyticsComponent from 'src/app/demo/dashboard/dash-analytics.component';

@Component({
  selector: 'app-dashboard',
  standalone :true ,
  imports: [DashAnalyticsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
