import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { LsLoaderModule } from '@laurelspa/ui/loader';
import { LsButtonGroupComponent } from './button-group/button-group.component';
import { LsAnchorComponent, LsButtonComponent } from './button.component';

@NgModule({
  declarations: [LsButtonComponent, LsAnchorComponent, LsButtonGroupComponent],
  imports: [CommonModule], //, LsLoaderModule],
  exports: [LsButtonComponent, LsAnchorComponent, LsButtonGroupComponent],
})
export class LsButtonModule {}
