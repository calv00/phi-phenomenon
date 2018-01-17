import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsPageComponent } from './tv-shows-page.component';

describe('TvShowsPageComponent', () => {
  let component: TvShowsPageComponent;
  let fixture: ComponentFixture<TvShowsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShowsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
