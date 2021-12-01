import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheTechniqueFormComponent } from './fiche-technique-form.component';

describe('FicheTechniqueFormComponent', () => {
  let component: FicheTechniqueFormComponent;
  let fixture: ComponentFixture<FicheTechniqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheTechniqueFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheTechniqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
