import { Component, Input } from '@angular/core';
import  feather from 'feather-icons';

@Component({
    selector: 'inspire-icon',
    standalone: false,
    template: `<i [innerHtml]="iconSvg | safeIcon"></i>`,
})
export class InspireIconComponent {
    private _name: any;
    private _size: number = 16;
    private _fillColor: string = 'none';
    private _strokeColor: string = 'currentColor';
    private _cssClasses: string = '';
    private _strokeWidth: number = 2;

    @Input() set name(value: string) {
        this._name = value;
    }
    get name(): string {
        return this._name;
    }

    @Input() set size(value: number) {
        this._size = value;
    }
    get size(): number {
        return this._size;
    }

    @Input() set fillColor(value: string) {
        this._fillColor = value;
    }
    get fillColor(): string {
        return this._fillColor;
    }

    @Input() set strokeColor(value: string) {
        this._strokeColor = value;
    }
    get strokeColor(): string {
        return this._strokeColor;
    }

    @Input() set cssClasses(value: string) {
        this._cssClasses = value;
    }
    get cssClasses(): string {
        return this._cssClasses;
    }

    @Input() set strokeWidth(value: number) {
        this._strokeWidth = value;
    }
    get strokeWidth(): number {
        return this._strokeWidth;
    }

    get iconSvg() {
        return feather.icons[this.name as keyof typeof feather.icons]?.toSvg({
            width: this.size,
            height: this.size,
            class: this.cssClasses,
            fill: this.fillColor,
            'stroke-width': this.strokeWidth,
            stroke: this.strokeColor,
        });
    }
}
