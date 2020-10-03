import {ElementRef} from '@angular/core';
import {Observable} from 'rxjs';

export function lazyScriptLoad(
  document: any,
  src: string,
  elRef: ElementRef = null,
  attrs: Array<{prop: string; value: string}> = [],
  id = 'lScript',
  type = 'text/javascript'
) {
  return new Observable(obs => {
    const script = document.createElement('script');
    script.id = id;
    script.type = type;
    script.src = src;

    attrs.forEach(item => {
      script.setAttribute(item.prop, item.value);
    });

    if (elRef) {
      elRef.nativeElement.appendChild(script);
    } else {
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    script.onload = () => {
      obs.next(script);
      obs.complete();
    };

    script.onerror = () => {
      obs.error();
      obs.complete();
    };
  });
}
