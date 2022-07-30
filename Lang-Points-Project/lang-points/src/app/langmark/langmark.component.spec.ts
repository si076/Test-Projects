import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangmarkComponent } from './langmark.component';

describe('LangmarkComponent', () => {
  let component: LangmarkComponent;
  let fixture: ComponentFixture<LangmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
