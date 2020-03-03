import { Injectable, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, retry } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MonitorService  {
  
  constructor(private http: HttpClient) {}

  /**
   * hàm xử lý lỗi
   * created by HDNam 2/3/2020
   * @param error 
   */
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * hàm thực hiện gọi api
   * created by HDNam 2/3/2020
   * @param url 
   */
  sendGetData(url){
    return this.http.get(url).pipe(catchError(this.handleError));
  }
}