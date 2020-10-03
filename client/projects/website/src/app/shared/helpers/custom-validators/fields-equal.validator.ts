import {AbstractControl} from '@angular/forms';

/**
 * Group validator used for validating that
 * two fields have the equal value a standard
 * example would be password fields
 *
 * @example
 *   this.form = this._fb.group({
 *     {
 *       password: '',
 *       confirmPassword: ''
 *     },
 *     {validator: passwordsEqualValidator('password', 'confirmPassword')}
 *   });
 */
export function fieldsEqualValidator(fieldOne: string, fieldTwo: string) {
  return (control: AbstractControl) => {
    if (control.get(fieldOne).value !== control.get(fieldTwo).value) {
      return {invalid: true};
    }
  };
}
