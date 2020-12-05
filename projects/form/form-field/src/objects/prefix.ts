import { Directive, InjectionToken } from '@angular/core';
import { LsAffix } from './affix';

/**
 * Injection token that can be used to reference instances of `LsPrefix`. It serves as
 * alternative token to the actual `LsPrefix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 *
 * *Note*: This is not part of the public API as the MDC-based form-field will not
 * need a lightweight token for `LsPrefix` and we want to reduce breaking changes.
 */
export const _LS_PREFIX = new InjectionToken<LsPrefix>('LsPrefix');

/** Hint text to be shown underneath the form field control. */
@Directive({
  selector: '[ls-prefix]',
  host: {
    class: 'ls-prefix',
  },
  providers: [{ provide: _LS_PREFIX, useExisting: LsPrefix }],
})
export class LsPrefix extends LsAffix {}
