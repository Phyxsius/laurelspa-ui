import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LsButtonComponent } from './button.component';

describe('LsButtonComponent', () => {
  let component: LsButtonComponent;
  let fixture: ComponentFixture<LsButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LsButtonComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
