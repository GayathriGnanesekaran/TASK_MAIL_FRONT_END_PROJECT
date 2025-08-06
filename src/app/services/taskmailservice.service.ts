import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskmailserviceService {
  commonUrl = 'https://192.168.2.107:9005';
  private userCredentail$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient) {}

  //use in header part
  getLoginSaveSuccess(): any {
    let saved: any = localStorage.getItem('loginData');
    return saved ? JSON.parse(saved) : null;
    // return saved.asObservable();
  }
  //use in login
  setLoginSaveSuccess(profile: any) {
    this.userCredentail$.next(profile);
    localStorage.setItem('loginData', JSON.stringify(profile));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  checkLogIn(data: any){
    return this.httpClient
      .post(`/api/my-profile/user-login`, data)
      .pipe(map((response: any) => response));
  }

  fetchDropDownValue(codeType: string) {
    return this.httpClient
      .get(`/api/CodeMaster/dropdown/${codeType}`)
      .pipe(map((response: any) => response.data));
  }

  saveTaskHeader(data: any) {
    return this.httpClient
      .post(`/api/taskHeader/insert`, data)
      .pipe(map((response: any) => response.data));
  }

  updateTaskHeader(data: any){
    return this.httpClient
      .put(`/api/taskHeader/update`, data)
      .pipe(map((response: any) => response.data));
  }
  getTaskHeader(data:any){
     let queryParams = new HttpParams();
        queryParams = queryParams.append('userName ', data?.userName ? data?.userName?.toString() : null);
        queryParams = queryParams.append('fromDate', data?.fromDate ? data?.dateFrom : null);
        queryParams = queryParams.append('toDate', data?.toDate ? data?.dateTo : null);
    return this.httpClient
    .get(`/api/taskHeader/retrieve`, {
            params: queryParams,
        })
    .pipe(map((response:any)=>response.data))
  }
  getTaskTimeHeader(headerId:string){
    return this.httpClient
    .get(`/api/taskDetails/retrieve/${headerId}`)
    .pipe(map((response: any) => response.data));
  }
}
