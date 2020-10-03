import {TestBed, inject} from '@angular/core/testing';

import {JasperoApiService} from './jaspero-api.service';

describe('JasperoApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JasperoApiService]
    });
  });

  it('should be created', inject(
    [JasperoApiService],
    (service: JasperoApiService) => {
      expect(service).toBeTruthy();
    }
  ));
});
