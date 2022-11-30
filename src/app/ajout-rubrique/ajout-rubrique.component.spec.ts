import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRubriqueComponent } from './ajout-rubrique.component';

describe('AjoutRubriqueComponent', () => {
  let component: AjoutRubriqueComponent;
  let fixture: ComponentFixture<AjoutRubriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutRubriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRubriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
