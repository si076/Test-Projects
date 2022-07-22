import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NounsComponent } from './nouns.component';

describe('NounsComponent', () => {
  let component: NounsComponent;
  let fixture: ComponentFixture<NounsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NounsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NounsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
