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
    //this.userCredentail$.next(profile);
    localStorage.setItem('loginData', JSON.stringify(profile));
  }
  setHeaderSuccess(headerData: any) {
    localStorage.setItem('headerValue', JSON.stringify(headerData));
  }
  getHeaderSuccess(): any {
    let header: any = localStorage.getItem('headerValue');
    return header ? JSON.parse(header) : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  checkLogIn(data: any) {
    return this.httpClient
      .post(`${this.commonUrl}/api/my-profile/login`,data)
      .pipe(map((response: any) => response));
  }

  fetchDropDownValue(codeType: string) {
    const loginUser = this.getLoginSaveSuccess();
    let queryParams = new HttpParams();
    queryParams = queryParams.append(
      'userId',
      loginUser && codeType === 'USERSNAME' ? loginUser?.userId?.toString() : 0
    );
    queryParams = queryParams.append('codeType', codeType);
    return this.httpClient
      .get(`${this.commonUrl}/api/CodeMaster/dropdown`, {
        params: queryParams,
      })
      .pipe(map((response: any) => response.data));
  }

  saveTaskHeader(data: any) {
    return this.httpClient
      .post(`${this.commonUrl}/api/taskHeader/insert`, data)
      .pipe(map((response: any) => response.data));
  }

  updateTaskHeader(data: any) {
    return this.httpClient
      .put(`${this.commonUrl}/api/taskHeader/update`, data)
      .pipe(map((response: any) => response.data));
  }
  getTaskHeader(data: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append(
      'userName',
      data?.userName ? data?.userName?.toString() : null
    );
    queryParams = queryParams.append(
      'fromDate',
      data?.fromDate ? data?.fromDate : null
    );
    queryParams = queryParams.append(
      'toDate',
      data?.toDate ? data?.toDate : null
    );
    return this.httpClient
      .get(`${this.commonUrl}/api/taskHeader/retrieve`, {
        params: queryParams,
      })
      .pipe(map((response: any) => response.data));
  }
  getTaskTimeHeader(headerId: string) {
    return this.httpClient
    .get(`${this.commonUrl}/api/taskDetails/retrieve/${headerId}`)
    .pipe(map((response: any) => response.data));

  }
  saveTasksDetails(data: any) {
    return this.httpClient
      .post(`${this.commonUrl}/api/taskDetails/insert`, data)
      .pipe(map((response: any) => response.data));
  }
  updateTasksDetails(data: any) {
    return this.httpClient
      .put(`${this.commonUrl}/api/taskDetails/update`, data)
      .pipe(map((response: any) => response.data));
  }
  deleteTasksDetails(detailsId: any,headerId:any) {
    return this.httpClient
      .delete(`${this.commonUrl}/api/taskDetails/delete/${detailsId}/${headerId}`)
      .pipe(map((response: any) => response));
  }
   sendTaskMail(headerId:any){
   const loginUser = this.getLoginSaveSuccess();
   let queryParams=new HttpParams();
    queryParams=queryParams.append('headerId',headerId ? headerId :0);
   queryParams=queryParams.append('userId',loginUser ? loginUser?.userId: 0)
    return this.httpClient
      .get(`${this.commonUrl}/api/SendMail`,{
        params: queryParams,
      })
      .pipe(map((response: any) => response));
   }

}
