import {AbstractControl} from '@angular/forms';

export function arrayNotEmptyValidator(control: AbstractControl) {
  if (!control.value || !control.value.length) {
    return {invalid: true};
  }
}
