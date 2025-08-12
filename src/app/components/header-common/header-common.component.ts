import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-common',
  standalone: false,
  templateUrl: './header-common.component.html',
  styleUrl: './header-common.component.css'
})
export class HeaderCommonComponent {
  @Input()loggeduser:any
  imgsrc='../../../assets/dummy-profile.jpg'
  }
