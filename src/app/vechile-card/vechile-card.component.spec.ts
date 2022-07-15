import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileCardComponent } from './vechile-card.component';

describe('VechileCardComponent', () => {
  let component: VechileCardComponent;
  let fixture: ComponentFixture<VechileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VechileCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VechileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
