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
dateArray: any[];
dataBar: any;
dataBarHits: any[];
dataBarCountry: any[];

view: any[] = [800, 400];

  // colorSheme
   colorScheme = {
      domain: ['#433e90', '#8ec127', '#1e2366', '#bcb1f9', '#ffcc00', '#dad3f2', '#4afffb', '#33c0fc']
    };
    colorSchemeCountry = {
      domain: [ '#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff']
    };


  constructor(private chartService: ChartService) {
    this.chartService.getData().subscribe(
      data => {
        this.data = data;
        const dArray = this.data.map((element) => {
          const date = new Date(element.date).getTime();
          const newDate = new Date(date).toLocaleDateString();
          element.date = newDate;
          return element;
        });
        this.dateArray = dArray;
        this.groupUser(this.dateArray);
        this.groupHits(this.dateArray);
        this.groupCountry(this.dateArray);
      });
  }

 ngOnInit() {
 }

  groupUser(dateArray) {
      const obj = groupBy(dateArray, 'date');
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
      this.createBar(ar);
  }

  filterByUserID(arrayH) {
    const array = [];
    arrayH.forEach(element => {
      if (
        typeof element.user_id === 'string' ||
        element.user_id instanceof String
      ) {
        if (element.user_id) {
          array.push(element);
        }
      }
    });
    return array;
  }

  updateContryKeyProprerty(array) {
    const arr = [];
    array.forEach(element => {
      if (element.payload) {
        if (Array.isArray(element.payload.countryCode)) {
          if (element.payload.countryCode.length !== 0) {
            const code = element.payload.countryCode[0];
            const objData = {};
            objData[code.toString()] = element;
            arr.push(objData);
          }
        }
      }
    });
   return this.sortToObject(arr);
  }

  sortToObject(array) {
    const obj = {};
    array.forEach(element => {
      for (const key of Object.keys(element)) {
        if (Object.keys(obj).length === 0) {
          const ar = [];
          const el = element[key];
          ar.push(el);
          obj[key] = ar;
        } else {
          if (Object.keys(obj).includes(key)) {
            const el = element[key];
            obj[key].push(el);
          } else {
            const ar = [];
            const el = element[key];
            ar.push(el);
            obj[key] = ar;
          }
        }
      }
    });
    return obj;
  }

  groupHits(arrayHits) {
  const obj = groupBy(this.filterByUserID(arrayHits), 'date');
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
    this.createBarHits(ar);
}

groupCountry(arrayCountry) {
 const obj = this.updateContryKeyProprerty(arrayCountry);
 console.log(obj);
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
  this.createBarCountry(ar);
}


  createBar(data) {
    this.dataBar = data;
  }

  createBarHits(data) {
    this.dataBarHits = data;
  }

  createBarCountry(data) {
    this.dataBarCountry = data;
  }

}
