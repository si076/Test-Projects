import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserobjectmanagementComponent } from './userobjectmanagement.component';

describe('UserobjectmanagementComponent', () => {
  let component: UserobjectmanagementComponent;
  let fixture: ComponentFixture<UserobjectmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserobjectmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserobjectmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
