import { TestBed, inject } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';

describe('MoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseService]
    });
  });

  it('should be created', inject([FirebaseService], (service: FirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
