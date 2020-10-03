import {AbstractControl} from '@angular/forms';

export function differentFromValue(value: any, error: string) {
  return (control: AbstractControl) => {
    const errorMessage = {notDifferentFrom: error};

    if (control.value === undefined) {
      return errorMessage;
    }

    return control.value !== value ? null : errorMessage;
  };
}
