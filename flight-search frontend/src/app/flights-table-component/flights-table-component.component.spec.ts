import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsTableComponentComponent } from './flights-table-component.component';

describe('FlightsTableComponentComponent', () => {
  let component: FlightsTableComponentComponent;
  let fixture: ComponentFixture<FlightsTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsTableComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
