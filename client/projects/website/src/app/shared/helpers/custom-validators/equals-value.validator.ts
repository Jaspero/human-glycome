import {AbstractControl} from '@angular/forms';

export function equalsValue(valueToEqual: any, error: string) {
  return (control: AbstractControl) => {
    const errorMessage = {notEqual: error};

    if (control.value === undefined) {
      return errorMessage;
    }

    return control.value === valueToEqual ? null : errorMessage;
  };
}
