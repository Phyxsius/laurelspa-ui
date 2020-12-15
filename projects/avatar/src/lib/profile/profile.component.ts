import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  Input,
} from '@angular/core';
import { coerceBooleanProperty } from '@laurelspa/ui/core';

@Directive({
  selector: '[profile-name]',
})
export class LsProfileName {}

@Directive({
  selector: '[profile-subtitle]',
})
export class LsProfileSubtitle {}

@Directive({
  selector: '[profile-image]',
})
export class LsProfileImage {}

@Component({
  selector: 'ls-profile, div[ls-profile], span[ls-profile], a[ls-profile]',
  exportAs: 'lsProfile',
  host: {
    class: 'ls-profile',
  },
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LsProfileComponent {
  @HostBinding('class.inline')
  @Input()
  public get inline(): any {
    return this._inline;
  }

  public set inline(value: any) {
    this._inline = coerceBooleanProperty(value);
  }

  private _inline: boolean = false;

  public constructor() {}
}
