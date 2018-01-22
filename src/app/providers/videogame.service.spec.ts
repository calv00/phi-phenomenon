import { TestBed, inject } from '@angular/core/testing';

import { VideogameService } from './videogame.service';

describe('VideogameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideogameService]
    });
  });

  it('should be created', inject([VideogameService], (service: VideogameService) => {
    expect(service).toBeTruthy();
  }));
});
