import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationEventService } from '../../services/application-event.service';
import { Subject, takeUntil } from 'rxjs';
import { TaskmailserviceService } from '../../services/taskmailservice.service';
@Component({
  selector: 'app-navigation',
  standalone: false,

  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  active = 'apply';
  
  public _destroyed$ = new Subject();
  loggeduser: any;

  constructor(private applicationEventService: ApplicationEventService,
    private taskmailserviceService:TaskmailserviceService
  ) {
        
  }

  ngOnInit(): void {
        this.loggeduser = this.taskmailserviceService.getLoginSaveSuccess()
    this.applicationEventService.appEvent$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((event) => {
        switch (event.name) {
          case 'EDIT': {
            console.log('data', event);
            this.active = 'apply';
            return;
          }
        }
      });


 
//         this.taskmailserviceService.getLoginSaveSuccess().subscribe((userData:any)=>{
//  this.loggeduser=userData
//         })
  }

  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
