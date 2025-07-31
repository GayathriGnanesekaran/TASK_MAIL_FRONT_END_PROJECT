import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationEventService } from '../../services/application-event.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-navigation',
  standalone: false,

  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  active = 'apply';
  public _destroyed$ = new Subject();

  constructor(private applicationEventService: ApplicationEventService) {}

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    // unsubcribe Observable
    this._destroyed$.next('');
    this._destroyed$.complete();
  }
}
