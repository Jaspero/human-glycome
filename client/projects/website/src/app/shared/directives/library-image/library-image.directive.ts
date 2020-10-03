import {HttpClient} from '@angular/common/http';
import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {ImageCircleModification} from '../../classes/image-modifications/image-circle-modification.class';
import {ImageRotateModification} from '../../classes/image-modifications/image-rotate-modification.class';
import {ImageSimpleModification} from '../../classes/image-modifications/image-simple-modification.class';
import {ImageSizeModification} from '../../classes/image-modifications/image-size-modification.class';
import {ImageTintModification} from '../../classes/image-modifications/image-tint-modification.class';
import {BROWSER_CONFIG} from '../../consts/browser-config.const';

@Directive({
  selector: '[jasperoLibraryImage]'
})
export class LibraryImageDirective {
  constructor(
    private _http: HttpClient,
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {}

  @Input()
  webp = true;
  @Input()
  modifications: Array<
    | ImageSizeModification
    | ImageRotateModification
    | ImageCircleModification
    | ImageTintModification
    | ImageSimpleModification
  > = [];
  @Input()
  set jasperoLibraryImage(item: string) {
    const valToUse = item.replace(
      /(\.jpg|\.jpeg|\.png)/i,
      `${this.modifications.map(mod => mod.modification).join('')}${
        this.webp && BROWSER_CONFIG.webpSupported ? '.webp' : '$1'
      }`
    );

    this._http.get(valToUse, {responseType: 'blob'}).subscribe(
      res => {
        const urlCreator = window.URL || window['webkitURL'];
        this.setValue(urlCreator.createObjectURL(res));
      },
      () => {
        this.setValue('/assets/images/missing-image.svg');
      }
    );
  }

  setValue(value: string) {
    /**
     * If the directive isn't attached to an img element
     * then it needs to attach a background style instead
     * of a src attribute
     */
    if (this._el.nativeElement.tagName !== 'IMG') {
      this._renderer.setStyle(
        this._el.nativeElement,
        'background-image',
        `url(${value})`
      );
    } else {
      this._renderer.setAttribute(this._el.nativeElement, 'src', value);
    }
  }
}
