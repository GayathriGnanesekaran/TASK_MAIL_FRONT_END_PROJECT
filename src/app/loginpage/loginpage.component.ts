import { Component,inject } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  standalone: false,
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  loginform=new FormGroup({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$')])
  })
  onsubmit(){
    console.log(this.loginform.value)
  }
}