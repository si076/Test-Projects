import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsereventsmanagementComponent } from './usereventsmanagement.component';

describe('UsereventsmanagementComponent', () => {
  let component: UsereventsmanagementComponent;
  let fixture: ComponentFixture<UsereventsmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsereventsmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsereventsmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
