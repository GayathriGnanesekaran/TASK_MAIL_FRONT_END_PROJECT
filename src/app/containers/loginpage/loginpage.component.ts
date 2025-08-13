import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loginpage',
  standalone: false,
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent {
  loginform = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    passcode: new FormControl('', [Validators.required]),
  });

  showpassword: boolean = false;
  loginError: string = '';
  togglepassword(): void {
    this.showpassword = !this.showpassword;
  }
  constructor(
    private router: Router,
    private taskmailserviceService: TaskmailserviceService
  ) {}
  onsubmit() {
    if (this.loginform.valid) {
      this.taskmailserviceService
        .checkLogIn(this.loginform.getRawValue())
        .subscribe((res) => {
          console.log(res);
          if (res.status === 2) {
            this.taskmailserviceService.setLoginSaveSuccess(res.data);
            this.taskmailserviceService.remove('headerValue');
            this.router.navigate(['/task/apply-page']);
          } else {
            this.loginError = res.message;
          }
        });
    } else {
      console.log('not valid');
    }
  }
}
