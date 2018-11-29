import { Component, OnInit } from '@angular/core';
import { ChartService } from '../shared/chart-service.service';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  pieData: any;
  dataChart: any;
  // options
  view: any[] = [600, 300];
  showLegend = true;
  colorScheme = {
    domain: [
      '#5AA454',
      '#f86432',
      '#fdbd2d',
      '#fffc4f',
      '#affffb',
      '#1d68fb',
      '#4afffb',
      '#33c0fc'
    ]
  };

  constructor(private chartService: ChartService) {
    this.chartService.getData().subscribe(data => {
      this.pieData = data;
      this.groupChartAction(this.pieData);
    });
  }
  ngOnInit() {}

  groupChartAction(dataArray) {
    const obj = groupBy(dataArray, 'action');
    const countArray = [];
    const ar = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const object = {};
        const n = obj[key].length;
        object['name'] = key;
        object['value'] = n;
        countArray.push(n);
        ar.push(object);
      }
    }
    this.createCircle(ar);
  }

  createCircle(data) {
    this.dataChart = data;
    this.showLegend = true;
  }
}
