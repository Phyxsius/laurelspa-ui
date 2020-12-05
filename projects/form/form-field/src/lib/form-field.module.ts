import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LsError } from './../objects/error';
import { LsHint } from './../objects/hint';
import { LsPrefix } from './../objects/prefix';
import { LsSuffix } from './../objects/suffix';
import { LsFormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [LsFormFieldComponent, LsHint, LsError, LsPrefix, LsSuffix],
  imports: [CommonModule],
  exports: [LsFormFieldComponent, LsHint, LsError, LsPrefix, LsSuffix],
})
export class LsFormFieldModule {}
