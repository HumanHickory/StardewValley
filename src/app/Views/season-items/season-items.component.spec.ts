import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonItemsComponent } from './season-items.component';

describe('SeasonItemsComponent', () => {
  let component: SeasonItemsComponent;
  let fixture: ComponentFixture<SeasonItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
