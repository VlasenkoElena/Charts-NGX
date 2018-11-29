import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
data: any[];
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
   return this.http.get<any>('http://localhost:3000/logs');
  }


}
