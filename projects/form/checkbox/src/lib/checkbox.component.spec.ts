import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LsCheckboxComponent } from './checkbox.component';

describe('LsCheckboxComponent', () => {
  let component: LsCheckboxComponent;
  let fixture: ComponentFixture<LsCheckboxComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LsCheckboxComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
