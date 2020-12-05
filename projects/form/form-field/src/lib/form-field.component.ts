import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  InjectionToken,
  Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty } from '@laurelspa/ui/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { LsError } from './../objects/error';
import { LsFormFieldControl } from './../objects/form-field-control';
import { LsHint } from './../objects/hint';
import { LsPrefix } from './../objects/prefix';
import { LsSuffix } from './../objects/suffix';

/**
 * Injection token that can be used to inject an instances of `LsFormField`. It serves
 * as alternative token to the actual `LsFormField` class which would cause unnecessary
 * retention of the `LsFormField` class and its component metadata.
 */
export const LS_FORM_FIELD = new InjectionToken<LsFormFieldComponent>(
  'LsFormField'
);

@Component({
  selector: 'ls-form-field, div[ls-form-field]',
  exportAs: 'lsFormField',
  host: {
    class: 'ls-form-field',
    '[class.ls-form-field--invalid]': 'control.errorState',
    '[class.ls-form-field--disabled]': 'control.disabled',
    '[class.ls-form-field--autofilled]': 'control.autofilled',
  },
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: LS_FORM_FIELD, useExisting: LsFormFieldComponent }],
})
export class LsFormFieldComponent implements AfterContentInit, OnDestroy {
  public _required: boolean;
  @HostBinding('class.required')
  @Input()
  public get required(): any {
    return this._required;
  }

  public set required(value: any) {
    this._required = coerceBooleanProperty(value);
  }

  public _optional: boolean;
  @HostBinding('class.optional')
  @Input()
  public get optional(): any {
    return this._optional;
  }

  public set optional(value: any) {
    this._optional = coerceBooleanProperty(value);
  }

  @ContentChild(LsFormFieldControl)
  public _formFieldControl: LsFormFieldControl<any>;

  @ContentChildren(LsPrefix, { descendants: true })
  public prefixChildren: QueryList<LsPrefix> = new QueryList<LsPrefix>();

  @ContentChildren(LsSuffix, { descendants: true })
  public suffixChildren: QueryList<LsSuffix> = new QueryList<LsSuffix>();

  @ContentChild(LsFormFieldControl) controlNonStatic: LsFormFieldControl<any>;
  @ContentChild(LsFormFieldControl, { static: true })
  controlStatic: LsFormFieldControl<any>;
  public get control() {
    return (
      this._explicitFormFieldControl ||
      this.controlNonStatic ||
      this.controlStatic
    );
  }
  public set control(value) {
    this._explicitFormFieldControl = value;
  }
  private _explicitFormFieldControl: LsFormFieldControl<any>;

  @ContentChildren(LsError, { descendants: true })
  private _errorChildren: QueryList<LsError> = new QueryList<LsError>();

  @ContentChildren(LsHint, { descendants: true })
  private _hintChildren: QueryList<LsHint> = new QueryList<LsHint>();

  private _destroyed: Subject<void> = new Subject<void>();

  public constructor(
    public elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngAfterContentInit(): void {
    const control: LsFormFieldControl<any> = this.control;
    if (control.controlType) {
      this.elementRef.nativeElement.classList.add(
        `ls-form-field-type-${control.controlType}`
      );
    }

    // Subscribe to changes in the child control state in order to update the form field UI.
    control.stateChanges.pipe(startWith(null!)).subscribe(() => {
      // this._validatePlaceholders();
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => this._changeDetectorRef.markForCheck());
    }

    // Re-validate when the number of hints changes.
    this._hintChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });

    // Update the aria-described by when the number of errors changes.
    this._errorChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** Determines whether to display hints or errors. */
  public getDisplayedMessages(): 'error' | 'hint' {
    return this._errorChildren &&
      this._errorChildren.length > 0 &&
      this.control.errorState
      ? 'error'
      : 'hint';
  }

  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */
  private _syncDescribedByIds(): void {
    if (this.control) {
      let ids: string[] = [];

      if (this.control.userAriaDescribedBy) {
        ids.push(...this.control.userAriaDescribedBy.split(' '));
      }

      if (this.getDisplayedMessages() === 'hint') {
        const startHint: LsHint = this._hintChildren
          ? this._hintChildren.find((hint: LsHint) => hint.align === 'start')
          : null;
        const endHint: LsHint = this._hintChildren
          ? this._hintChildren.find((hint: LsHint) => hint.align === 'end')
          : null;

        if (startHint) {
          ids.push(startHint.id);
        }

        if (endHint) {
          ids.push(endHint.id);
        }
      } else if (this._errorChildren) {
        ids = this._errorChildren.map((error: LsError) => error.id);
      }

      this.control.setDescribedByIds(ids);
    }
  }

  /** Does any extra processing that is required when handling the hints. */
  private _processHints(): void {
    this._validateHints();
    this._syncDescribedByIds();
  }

  /**
   * Ensure that there is a maximum of one of each `<ls-hint>` alignment specified, with the
   * attribute being considered as `align="start"`.
   */
  private _validateHints(): void {
    if (this._hintChildren) {
      let startHint: LsHint;
      let endHint: LsHint;

      // this._hintChildren.forEach((hint: LsHint) => {
      //   if (hint.align === 'start') {
      //     if (startHint || this.hintLabel) {
      //       throw getMatFormFieldDuplicatedHintError('start');
      //     }
      //     startHint = hint;
      //   } else if (hint.align === 'end') {
      //     if (endHint) {
      //       throw getMatFormFieldDuplicatedHintError('end');
      //     }
      //     endHint = hint;
      //   }
      // });
    }
  }
}
