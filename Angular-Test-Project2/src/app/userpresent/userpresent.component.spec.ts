import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpresentComponent } from './userpresent.component';

describe('UserpresentComponent', () => {
  let component: UserpresentComponent;
  let fixture: ComponentFixture<UserpresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpresentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
