import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSComponent } from './advanced-s.component';

describe('AdvancedSComponent', () => {
  let component: AdvancedSComponent;
  let fixture: ComponentFixture<AdvancedSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
