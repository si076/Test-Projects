import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangtoolbarComponent } from './langtoolbar.component';

describe('LangtoolbarComponent', () => {
  let component: LangtoolbarComponent;
  let fixture: ComponentFixture<LangtoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangtoolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangtoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
