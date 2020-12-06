import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ls-button-group, [ls-button-group]',
  exportAs: 'lsButtonGroup',
  host: {
    class: 'ls-button-group',
  },
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LsButtonGroupComponent {
  public constructor() {}
}
