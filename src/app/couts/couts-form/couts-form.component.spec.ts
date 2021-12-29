import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutsFormComponent } from './couts-form.component';

describe('CoutsFormComponent', () => {
  let component: CoutsFormComponent;
  let fixture: ComponentFixture<CoutsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoutsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoutsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
