import { Component,inject } from '@angular/core';
import { FormControl, FormGroup ,ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';

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
 
  showpassword:boolean=false
  togglepassword():void{
    this.showpassword=!this.showpassword
  }
  constructor(private router:Router){

  }
  onsubmit(){
    if(this.loginform.valid){
        this.router.navigate(['/applypage'])
        console.log(this.loginform.value)
        console.log("navigation success")
    }
    else{
      console.log("not valid")
    }
  }
}
