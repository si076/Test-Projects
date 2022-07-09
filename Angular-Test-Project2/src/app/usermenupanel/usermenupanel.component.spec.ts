import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermenupanelComponent } from './usermenupanel.component';

describe('UsermenupanelComponent', () => {
  let component: UsermenupanelComponent;
  let fixture: ComponentFixture<UsermenupanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsermenupanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermenupanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
