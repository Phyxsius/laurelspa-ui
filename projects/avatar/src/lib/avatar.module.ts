import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LsAvatarStackComponent } from './avatar-stack/avatar-stack.component';
import { LsAvatarComponent } from './avatar.component';
import {
  LsProfileComponent,
  LsProfileImage,
  LsProfileName,
  LsProfileSubtitle,
} from './profile/profile.component';

@NgModule({
  declarations: [
    LsAvatarComponent,
    LsAvatarStackComponent,
    LsProfileComponent,
    LsProfileName,
    LsProfileSubtitle,
    LsProfileImage,
  ],
  imports: [CommonModule],
  exports: [
    LsAvatarComponent,
    LsAvatarStackComponent,
    LsProfileComponent,
    LsProfileName,
    LsProfileSubtitle,
    LsProfileImage,
  ],
})
export class LsAvatarModule {}
