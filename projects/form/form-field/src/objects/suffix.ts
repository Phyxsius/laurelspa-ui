import { Directive, InjectionToken } from '@angular/core';
import { LsAffix } from './affix';

/**
 * Injection token that can be used to reference instances of `LsSuffix`. It serves as
 * alternative token to the actual `LsSuffix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 *
 * *Note*: This is not part of the public API as the MDC-based form-field will not
 * need a lightweight token for `LsSuffix` and we want to reduce breaking changes.
 */
export const _LS_SUFFIX = new InjectionToken<LsSuffix>('LsSuffix');

/** Hint text to be shown underneath the form field control. */
@Directive({
  selector: '[ls-suffix]',
  host: {
    class: 'ls-suffix',
  },
  providers: [{ provide: _LS_SUFFIX, useExisting: LsSuffix }],
})
export class LsSuffix extends LsAffix {}
