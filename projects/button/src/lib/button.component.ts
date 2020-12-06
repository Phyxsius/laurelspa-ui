import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  CanDisableCtor,
  coerceBooleanProperty,
  mixinDisabled,
} from '@laurelspa/ui/core';

/**
 * List of classes to add to LsButton instances based on host attributes to
 * style as different variants.
 */
const BUTTON_HOST_ATTRIBUTES = [
  'ls-button',
  'ls-button--primary',
  'ls-button--secondary',
  'ls-button--tertiary',
  'ls-button--warning',
  'ls-button--raised',
];

class LsButtonBase {
  public constructor(public elementRef: ElementRef) {}
}

const _LsButtonMixinBase: CanDisableCtor & typeof LsButtonBase = mixinDisabled(
  LsButtonBase
);

@Component({
  selector: `button[ls-button],
    button[ls-button--primary],
    button[ls-button--secondary],
    button[ls-button--tertiary],
    button[ls-button--warning],
    button[ls-button--raised]`,
  exportAs: 'lsButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LsButtonComponent extends _LsButtonMixinBase implements OnChanges {
  @HostBinding('attr.disabled')
  public get isDisabled(): boolean {
    return this.disabled || null;
  }

  @Input() public disabled: boolean;

  @Input('loading')
  public get loading(): any {
    return this._loading;
  }

  public set loading(value: any) {
    this._loading = coerceBooleanProperty(value);
  }

  private _loading: boolean = false;

  public constructor(
    public elementRef: ElementRef,
    protected _injector: Injector
  ) {
    super(elementRef);

    // For each of the variant selectors that is present in the button's host
    // attributes, add the correct corresponding class.
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all buttons. We do it here rather than `host` to ensure that
    // the class is applied to derived classes.
    elementRef.nativeElement.classList.add('ls-button');

    // const ButtonElement: any = createCustomElement(LsButtonComponent, {
    //   injector: this._injector,
    // });
    // customElements.define('ls-button', ButtonElement);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // if (changes.disabled) {
    //   this.disabled = changes.disabled.currentValue;
    //   console.log(this.disabled);
    // }
  }

  /** Gets whether the button has one of the given attributes. */
  private _hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this._getHostElement().hasAttribute(attribute)
    );
  }

  private _getHostElement(): any {
    return this.elementRef.nativeElement;
  }
}

@Component({
  selector: `a[ls-button],
    a[ls-button--primary],
    a[ls-button--secondary],
    a[ls-button--tertiary],
    a[ls-button--warning],
    a[ls-button--raised]`,
  exportAs: 'lsButton, lsAnchor',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LsAnchorComponent extends LsButtonComponent {
  @Input() public tabIndex: number;

  @HostBinding('attr.disabled')
  public get isDisabled(): boolean {
    return this.disabled || null;
  }

  @HostBinding('attr.aria-disabled')
  public get ariaDisabled(): string {
    return this.disabled.toString();
  }

  @HostBinding('attr.tabindex')
  public get tabindex(): number {
    return this.disabled ? -1 : this.tabIndex || 0;
  }

  public constructor(
    public elementRef: ElementRef,
    protected _injector: Injector
  ) {
    super(elementRef, _injector);
  }

  @HostListener('click', ['$event'])
  public haltDisabledEvents(event: Event): void {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
