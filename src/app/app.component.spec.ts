import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const tourMock = {
    startTour: () => {},
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, GuidedTourModule],
      declarations: [AppComponent],
      providers: [{ provide: GuidedTourService, useValue: tourMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GeoML'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GeoML');
  });
});
