import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeIcon',
})
export class SafeIconPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(svg: string) {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }
}
