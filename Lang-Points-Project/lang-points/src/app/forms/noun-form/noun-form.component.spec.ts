import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NounFormComponent } from './noun-form.component';

describe('NounFormComponent', () => {
  let component: NounFormComponent;
  let fixture: ComponentFixture<NounFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NounFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NounFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
