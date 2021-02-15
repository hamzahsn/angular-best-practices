import { emailDomainValidator } from './email-domain.directive';
import { FormControl } from '@angular/forms';

describe('emailDomainValidator', () => {
  const email = new FormControl('', [emailDomainValidator()]);

  it('should display an error for invalid email', () => {
    email.patchValue('hamza');

    expect(email.valid).toBeFalsy();
    expect(email.errors).toEqual({ emailDomain: 'name@hostname.domain' });
  });

  it('should display an error for invalid hostname', () => {
    email.patchValue('hamza@h');

    expect(email.valid).toBeFalsy();
    expect(email.errors).toEqual({ emailDomain: 'name@hostname.domain' });
  });

  it('should have more than 1 character', () => {
    email.patchValue('hamza@hostname.c');

    expect(email.valid).toBeFalsy();
    expect(email.errors).toEqual({
      emailDomain: 'name@hostname.domain',
    });
  });

  it('should return null when email is correct', () => {
    email.patchValue('hamza@hostname.com');

    expect(email).toBeTruthy();
    expect(email.valid).toBeTruthy();
  });
});
