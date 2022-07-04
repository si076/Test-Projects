import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectdispComponent } from './objectdisp.component';

describe('ObjectdispComponent', () => {
  let component: ObjectdispComponent;
  let fixture: ComponentFixture<ObjectdispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectdispComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectdispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
