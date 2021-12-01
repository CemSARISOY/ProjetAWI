import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheTechniqueListComponent } from './fiche-technique-list.component';

describe('FicheTechniqueListComponent', () => {
  let component: FicheTechniqueListComponent;
  let fixture: ComponentFixture<FicheTechniqueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheTechniqueListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheTechniqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
