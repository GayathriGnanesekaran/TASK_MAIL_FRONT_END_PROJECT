import { Component, Input, ViewChild } from '@angular/core';
import { ApplicationEventService, IApplicationEvent } from '../../services/application-event.service';
import { Subject, takeUntil } from 'rxjs';
import { NgbPopover, NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
export interface IDiceMenu {
    codeName: string;
    screenName: string;
    actionType: string;
}

@Component({
  selector: 'app-dice-menu',
  standalone: false,
  templateUrl: './dice-menu.component.html',
  styleUrl: './dice-menu.component.css',
  providers: [NgbPopoverConfig]
})
export class DiceMenuComponent {
@Input() state: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
    @Input() position: 'right' | 'left' = 'right';
    @Input() actionLinks!: IDiceMenu[] | null;
    @Input() item: any;
    @Input() index!: number;
    @Input() hostComponent!: string;
    public _destroyed$ = new Subject();
    @ViewChild('popover') popover!: NgbPopover;
  listener!: () => void;
  constructor(
    private applicationEventService: ApplicationEventService,
    config: NgbPopoverConfig,
  ) {
    config.autoClose = true;
  }

    ngOnInit() {
        this.scrollHandle();
    }

    scrollHandle() {
        this.applicationEventService.scrollEvent$.pipe(takeUntil(this._destroyed$)).subscribe((event) => {
            if (event) {
                if (this.popover.isOpen()) {
                    this.popover.close();
                }
            }
        });
    }

    triggerEvent(link: IDiceMenu) {
        const event: IApplicationEvent = {
            name: link.codeName,
            component: 'DiceMenuComponent',
            value: {item: {...this.item}, index: this.index, hostComponent: this.hostComponent },
        };
        this.applicationEventService.emitAnEvent(event);
    }

    clickStopper(event: any) {
        const $event: IApplicationEvent = {
            name: 'DICE_BUTTON_CLICK',
            component: 'DiceMenuComponent',
            value: {
                item: this.item,
                index: this.index,
                hostComponent: this.hostComponent,
            },
        };
        this.applicationEventService.emitAnEvent($event);

        event.stopPropagation();
        return;
    }

    deRegisterScrollEvent(ev: any): void {
        if (!!ev) {
            this.applicationEventService.emitScrollEvent(false);
        }
    }

    // Dicemenu Implementation for Ag-Grid
    agInit(params: any): void {
        this.actionLinks = params.actionLinks;
        this.item = params.item;
        this.hostComponent = params.hostComponent;
    }
    ngOnDestroy(): void {
        this._destroyed$.next('');
        this._destroyed$.complete();
    }
}
