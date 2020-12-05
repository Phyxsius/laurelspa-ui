import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsFormFieldComponent } from './form-field.component';

describe('LsFormFieldComponent', () => {
  let component: LsFormFieldComponent;
  let fixture: ComponentFixture<LsFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LsFormFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
