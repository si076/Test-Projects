import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NounComponent } from './noun.component';

describe('NounComponent', () => {
  let component: NounComponent;
  let fixture: ComponentFixture<NounComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NounComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
