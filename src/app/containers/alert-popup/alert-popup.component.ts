import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMsg } from '../../components/modal-msg';



@Component({
  selector: 'app-alert-popup',
  standalone: false,
  templateUrl: './alert-popup.component.html',
  styleUrl: './alert-popup.component.css'
})
export class AlertPopupComponent implements OnInit{
    content!: ModalMsg ;
    title!: string  ;

    constructor(public activeModal: NgbActiveModal) {}
    ngOnInit() {}
}
