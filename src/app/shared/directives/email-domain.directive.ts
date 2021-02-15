import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailDomainValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    if (!control.value) {
      return null;
    }

    const isValidFormat = control.value.match(pattern);
    return !isValidFormat
      ? {
          emailDomain: 'name@hostname.domain',
        }
      : null;
  };
}
