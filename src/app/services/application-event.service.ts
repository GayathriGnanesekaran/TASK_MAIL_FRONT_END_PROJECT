import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface IApplicationEvent {
    name: string;
    component: string;
    value: any;
}

@Injectable({
    providedIn: 'root',
})

export class ApplicationEventService {
    // Observable event sources
    private _appEvent = new Subject<IApplicationEvent>();
    private _scrollEvent = new Subject<boolean>();

    // Observable event streams
    appEvent$ = this._appEvent.asObservable();
    scrollEvent$ = this._scrollEvent.asObservable();

    // Service emit commands
    emitAnEvent(appEvent: IApplicationEvent) {
        this._appEvent.next(appEvent);
    }

    emitScrollEvent(isScrolling: boolean) {
        this._scrollEvent.next(isScrolling);
    }
}

