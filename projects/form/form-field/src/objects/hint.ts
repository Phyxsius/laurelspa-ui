import { Directive, HostBinding, Input, InjectionToken } from '@angular/core';

let nextUniqueId: number = 0;

/**
 * Injection token that can be used to reference instances of `LsHint`. It serves as
 * alternative token to the actual `LsHint` class which could cause unnecessary
 * retention of the class and its directive metadata.
 *
 * *Note*: This is not part of the public API as the MDC-based form-field will not
 * need a lightweight token for `LsHint` and we want to reduce breaking changes.
 */
export const _LS_HINT = new InjectionToken<LsHint>('LsHint');

/** Hint text to be shown underneath the form field control. */
@Directive({
  selector: '[ls-hint]',
  host: {
    class: 'ls-hint',
    '[attr.id]': 'id',
  },
  providers: [{ provide: _LS_HINT, useExisting: LsHint }],
})
export class LsHint {
  /** Whether to align the hint label at the start or end of the line. */
  @HostBinding('attr.align')
  @Input()
  align: 'start' | 'end' = 'start';

  /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
  @HostBinding('attr.id')
  @Input()
  public id: string = `ls-hint-${nextUniqueId++}`;
}
