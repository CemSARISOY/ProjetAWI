import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheTechniqueDetailsComponent } from './fiche-technique-details.component';

describe('FicheTechniqueDetailsComponent', () => {
  let component: FicheTechniqueDetailsComponent;
  let fixture: ComponentFixture<FicheTechniqueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheTechniqueDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheTechniqueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
