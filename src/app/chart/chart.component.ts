import { Component, OnInit } from '@angular/core';
import { ChartService } from '../shared/chart-service.service';

import { groupBy } from 'lodash';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
data: any;
dateArray: any;
dataCircle: any;
single: any;

view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

    colorScheme = {
      domain: ['#5AA454', '#f86432', '#fdbd2d', '#fffc4f', '#affffb', '#1d68fb', '#4afffb', '#33c0fc']
    };


  constructor(private chartService: ChartService) {
    this.chartService.getData().subscribe(
      data => {
        this.data = data;
        const dArray = this.data.map((element) => {
          const date = new Date(element.date).getTime();
          const newDate = new Date(date).toLocaleDateString();
          element.date = newDate;
        //  console.log(element.date);
          return element;
        });
        this.dateArray = dArray;
        this.sortAction(this.dateArray);
      });
  }

 ngOnInit() {}

  sortAction(dateArray) {
      const obj = groupBy(dateArray, 'action');
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
    console.log(data);
    this.single = data;
    this.showLegend = true;
  }

}
