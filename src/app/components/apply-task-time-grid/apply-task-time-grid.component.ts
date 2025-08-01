import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-apply-task-time-grid',
  standalone: false,
  templateUrl: './apply-task-time-grid.component.html',
  styleUrl: './apply-task-time-grid.component.css'
})
export class ApplyTaskTimeGridComponent implements OnInit{
  @Input() ApplyTaskTimeFormGroup!:FormGroup
  @Input() resourceDropdown:any[]=[]
  @Input() typeDropdown:any[]=[]

  constructor(){
  }
  ngOnInit(): void {
   
  }
}
