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
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
        .checkLogIn('gayathri', 'iknjhh')
        .subscribe((res) => {
          console.log(res);
          if (res.status === 2) {
            this.taskmailserviceService.setLoginSaveSuccess(res.data);
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
