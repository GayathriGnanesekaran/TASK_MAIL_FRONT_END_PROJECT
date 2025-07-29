import { Component } from '@angular/core';
import * as feather from 'feather-icons';
import { FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-applypage',
  standalone: false,
  templateUrl: './applypage.component.html',
  styleUrl: './applypage.component.css'
})
export class ApplypageComponent {
ngAfterViewInit() {
    feather.replace(); 
  }
  months=[1,2,3,4,5,6,7,8,9,10,11,12]
  dates=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
   tasktimeform=new FormGroup({
    sno:new FormControl('',Validators.required),
    resource:new FormControl('',Validators.required),
    type:new FormControl('',Validators.required),
    month:new FormControl('',Validators.required),
    date:new FormControl('',Validators.required),
    year:new FormControl('',Validators.required),
    intime:new FormControl('',Validators.required),
    outtime:new FormControl('',Validators.required),
    totalduration:new FormControl('',Validators.required),
    breakduration:new FormControl('',Validators.required),
    activeworkhours:new FormControl('',Validators.required),
    comments:new FormControl('',Validators.required)
  })
  onsubmit(){
    console.log(this.tasktimeform.value)
  }
   username: string = 'Krish';
  email: string = 'pkrish@simplesolve.com';


}
