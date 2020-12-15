import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LsProfileComponent } from './profile.component';

describe('LsProfileComponent', () => {
  let component: LsProfileComponent;
  let fixture: ComponentFixture<LsProfileComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LsProfileComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
