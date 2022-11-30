import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocsComponent } from './blocs.component';

describe('BlocsComponent', () => {
  let component: BlocsComponent;
  let fixture: ComponentFixture<BlocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
