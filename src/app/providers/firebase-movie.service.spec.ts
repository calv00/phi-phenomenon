import { TestBed, inject } from '@angular/core/testing';

import { FirebaseMovieService } from './firebase-movie.service';

describe('FirebaseMovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseMovieService]
    });
  });

  it('should be created', inject([FirebaseMovieService], (service: FirebaseMovieService) => {
    expect(service).toBeTruthy();
  }));
});
