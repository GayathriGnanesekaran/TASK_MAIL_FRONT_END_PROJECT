import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskmailserviceService {
  commonUrl='https://192.168.2.107:9005'
  constructor(private httpClient: HttpClient) { }

      checkLogIn(usersName?: string, password?: string) {
        let data={
        usersName:'gayathiri',
        password:'1234'
        }
        return this.httpClient
            .post(`${this.commonUrl}/api/my-profile/user-login`,data)
            .pipe(map((response: any) => (response)));
        }
}
