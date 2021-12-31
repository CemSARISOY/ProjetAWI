import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetteDialogueComponent } from './etiquette-dialogue.component';

describe('EtiquetteDialogueComponent', () => {
  let component: EtiquetteDialogueComponent;
  let fixture: ComponentFixture<EtiquetteDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtiquetteDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetteDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
