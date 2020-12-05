import { Directive, InjectionToken, Input } from '@angular/core';

let nextUniqueId: number = 0;

/**
 * Injection token that can be used to reference instances of `LsError`. It serves as
 * alternative token to the actual `LsError` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const XCU_ERROR = new InjectionToken<LsError>('LsError');

/** Single error message to be shown underneath the form field. */
@Directive({
  selector: '[ls-error]',
  host: {
    class: 'ls-error',
    role: 'alert',
    '[attr.id]': 'id',
  },
  providers: [{ provide: XCU_ERROR, useExisting: LsError }],
})
export class LsError {
  @Input()
  public id: string = `ls-error-${nextUniqueId++}`;
}
