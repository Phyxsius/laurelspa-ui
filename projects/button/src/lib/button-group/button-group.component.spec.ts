import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsButtonGroupComponent } from './button-group.component';

describe('LsButtonGroupComponent', () => {
  let component: LsButtonGroupComponent;
  let fixture: ComponentFixture<LsButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LsButtonGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
